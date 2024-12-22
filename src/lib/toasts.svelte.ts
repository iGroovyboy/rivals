export interface Toast {
	content: string;
	color: string;
	duration: number;
	id: number;
	timer: number;
	faded?: boolean;
}

export let useToasts = $state({
	toasts: []
});

export const TOAST_COLOR = {
	RED: 'red',
	ORANGE: 'orange'
};

export const removeToast = (id: number) => {
	useToasts.toasts = useToasts.toasts.filter((t) => t.id !== id);
};

export const toast = (content: string, color = 'green', duration = 5000) => {
	if (!content || !content.length) {
		return;
	}

	const id = Date.now();
	const toast = {
		content: content,
		color: color,
		duration: duration,
		id: id,
		timer: setTimeout(() => {
			removeToast(id);
		}, duration)
	};

	useToasts.toasts.push(toast);
	useToasts.toasts[toast.id]?.timer;
};
