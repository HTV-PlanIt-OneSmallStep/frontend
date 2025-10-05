/**
 * Convert a subtask object to the event shape used by the calendar sample.
 * Expected subtask fields: { eventId, name, date, startTime, endTime }
 * Returns: { id, date, title, start, end }
 */
export function subtaskToEvent(subtask) {
	if (!subtask) return null
	const id = subtask.eventId ?? subtask.id ?? String(Math.random()).slice(2,8)
	// normalize date as YYYY-MM-DD if possible
	const date = (() => {
		if (!subtask.date) return new Date().toISOString().slice(0,10)
		// accept already-correct ISO-like string or try to coerce
		try {
			const d = new Date(subtask.date)
			if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0,10)
		} catch (e) {
			// fallback
		}
		// naive fallback: return as-is
		return subtask.date
	})()

	const normalizeTime = (t) => {
		if (!t) return undefined
		// if t looks like H:MM or HH:MM, try to parse and pad
		const m = String(t).trim().match(/^(\d{1,2}):(\d{2})$/)
		if (m) {
			const hh = m[1].padStart(2,'0')
			const mm = m[2]
			return `${hh}:${mm}`
		}
		// try to parse common variants like '9:00', '09:00', or '9'
		const num = Number(t)
		if (!Number.isNaN(num)) {
			const hh = String(Math.floor(num)).padStart(2,'0')
			return `${hh}:00`
		}
		return String(t)
	}

	const start = normalizeTime(subtask.startTime || subtask.start)
	const end = normalizeTime(subtask.endTime || subtask.end)

	return {
		id: String(id),
		date,
		title: subtask.name || subtask.title || 'Untitled',
		start,
		end,
	}
}

export function subtaskListToEvents(list = []) {
	return list.map(subtaskToEvent).filter(Boolean)
}