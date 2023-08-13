export class Scroll {
	// scroll 할 수록 숫자가 더 큼
    static isBottom(window: Window): boolean {
		const currentPosition = Math.ceil(window.innerHeight + window.scrollY);
		const bottomPosition = window.document.documentElement.scrollHeight;
		return currentPosition >= bottomPosition;
    }

    static keepPosition(window: Window, until: () => void) {
		const lastScrollX = window.scrollX;
		const lastScrollY = window.scrollY;
        until();
		window.scrollTo(lastScrollX, lastScrollY);
    }

	static toTop(window: Window) {
		window.scrollTo(0, 0);
	}
}
