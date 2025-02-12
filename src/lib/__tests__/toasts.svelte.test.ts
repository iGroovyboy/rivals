import { describe, expect, it, vi, beforeEach } from 'vitest';
import { removeToast, toast, TOAST_COLOR, useToasts } from '$lib/toasts.svelte';

describe('useToasts', () => {
	beforeEach(() => {
		useToasts.toasts = [];
	});

	it('should add a toast', () => {
		toast('Test message', TOAST_COLOR.RED, 3000);
		expect(useToasts.toasts.length).toBe(1);
		expect(useToasts.toasts[0].content).toBe('Test message');
		expect(useToasts.toasts[0].color).toBe(TOAST_COLOR.RED);
	});

	it('should not add an empty toast', () => {
		toast('');
		expect(useToasts.toasts.length).toBe(0);
	});

	it('should remove a toast', () => {
		toast('To remove', TOAST_COLOR.ORANGE, 3000);
		const id = useToasts.toasts[0].id;
		removeToast(id);
		expect(useToasts.toasts.find((t) => t.id === id)).toBeUndefined();
	});

	it('should auto-remove a toast after duration', async () => {
		vi.useFakeTimers();
		toast('Auto-remove', 'green', 3000);
		expect(useToasts.toasts.length).toBe(1);
		vi.advanceTimersByTime(3000);
		expect(useToasts.toasts.length).toBe(0);
		vi.useRealTimers();
	});
});
