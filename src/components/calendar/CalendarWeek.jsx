import React, { useRef, useEffect, useState, useMemo } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import './CalendarWeek.css'

export default function CalendarWeek({ events = [] }) {
  const calendarRef = useRef(null)
  const [daysToShow, setDaysToShow] = useState(
		() => selectDaysToShow(typeof window !== 'undefined' ? window.innerWidth : 1024)
	)
	const daysToSkip = useMemo(() => daysToShow === 7 ? 7 : 1, [daysToShow])

  const fcEvents = events.map(e => ({
    id: e.id,
    title: e.title,
    start: `${e.date}T${e.start}`,
    end: e.end ? `${e.date}T${e.end}` : undefined,
  }))

	const onResize = () => {
		const num = selectDaysToShow(window.innerWidth)
		setDaysToShow(num)
	}
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const customButtons = {
    prev: {
      text: '<',
      click: () => {
        const api = calendarRef.current?.getApi()
        if (!api) return
        const cur = api.getDate()
        const d = new Date(cur)
        d.setDate(d.getDate() - daysToSkip)
        api.gotoDate(d)
      }
    },
    next: {
      text: '>',
      click: () => {
        const api = calendarRef.current?.getApi()
        if (!api) return
        const cur = api.getDate()
        const d = new Date(cur)
        d.setDate(d.getDate() + daysToSkip)
        api.gotoDate(d)
      }
    }
  }

  function handleDatesSet(info) {
    if (!info) return
		scrollTo9am();
  }

  // track last highlighted event id to clear highlight
  const lastHighlightedId = useRef(null)
  useEffect(() => {
    function handleHighlight(e) {
      const id = e?.detail?.id
      if (!id) return
      const api = calendarRef.current?.getApi()
      if (!api) return

      // clear previous highlight
      if (lastHighlightedId.current) {
        const prev = api.getEventById(String(lastHighlightedId.current))
        if (prev && typeof prev.setProp === 'function') {
          // reset to default
          prev.setProp('backgroundColor', '')
          prev.setProp('borderColor', '')
        } else {
          // fallback: remove DOM class
          const prevEl = document.querySelector(`.fc-event[data-event-id="${lastHighlightedId.current}"]`)
          if (prevEl) prevEl.classList.remove('highlighted-event')
        }
      }

      const ev = api.getEventById(String(id))
      if (ev && typeof ev.setProp === 'function') {
        ev.setProp('backgroundColor', '#ffef8a')
        ev.setProp('borderColor', '#ffcf33')
      } else {
        // fallback: add DOM class to event element(s)
        const el = document.querySelectorAll(`.fc-event[data-event-id="${id}"]`)
        el.forEach(n => n.classList.add('highlighted-event'))
      }

      lastHighlightedId.current = id
    }

    window.addEventListener('highlight-event', handleHighlight)
    return () => window.removeEventListener('highlight-event', handleHighlight)
  }, [])


  return (
    <div className="fc-wrapper">
      <FullCalendar
        ref={calendarRef}
        plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
        initialView="timeGrid"
        customButtons={customButtons}
				headerToolbar={{ left: 'today', center: 'title', right: 'prev,next'}}
        selectable={true}
        events={fcEvents}
				allDaySlot={true}
				nowIndicator={true}
				slotDuration={'00:30:00'}
				scrollTime={'09:00:00'}
        datesSet={handleDatesSet}
				views={{ timeGrid: { duration: { days: daysToShow }, dayMaxEventRows: true }, timeGridWeek: { dayMaxEventRows: true } }}
      />
		</div>
  )
}

function selectDaysToShow(width) {
  if (width < 480) return 2
  if (width < 768) return 3
  if (width < 1100) return 5
  return 7
}

function scrollTo9am() {
	const scroller = document.querySelector('.fc .fc-scroller')
	if (!scroller) return

	const timegrid = Array.from(document.querySelectorAll('.fc .fc-timegrid-slot-label-cushion'))
	let labelEl = null
	for (const node of timegrid) {
		const found = Array.from(node.querySelectorAll('*')).find(el => el.textContent && el.textContent.trim().startsWith('9am'))
		if (found) { labelEl = found; break }
	}
	if (labelEl) {
		const scrollerRect = scroller.getBoundingClientRect()
		const labelRect = labelEl.getBoundingClientRect()
		const offset = labelRect.top - scrollerRect.top
		scroller.scrollTop += offset - 24
	}
}
