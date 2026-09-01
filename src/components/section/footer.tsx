import { useRef, useState } from "react";

export const Footer = () => {
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const origin = useRef({ x: 0, y: 0 });
	const boxRef = useRef<HTMLDivElement>(null);

	const clamp = (v: number, min: number, max: number) =>
		Math.min(Math.max(v, min), max);

	const onPointerDown = (e: React.PointerEvent) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		origin.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
		setDragging(true);
	};

	const onPointerMove = (e: React.PointerEvent) => {
		if (!dragging || !boxRef.current) return;
		const rect = boxRef.current.getBoundingClientRect();
		// rect already includes current translate, so back it out to get the layout origin
		const doc = document.documentElement;
		// page coords, so bounds are the whole scrollable area, not just the viewport
		const baseX = rect.left + window.scrollX - pos.x;
		const baseY = rect.top + window.scrollY - pos.y;
		setPos({
			x: clamp(
				e.clientX - origin.current.x,
				-baseX,
				doc.scrollWidth - rect.width - baseX,
			),
			y: clamp(
				e.clientY - origin.current.y,
				-baseY,
				doc.scrollHeight - rect.height - baseY,
			),
		});
	};

	return (
		<div className="w-full py-4 space-y-2">
			<div className="flex justify-center ">
				<div
					ref={boxRef}
					className="space-y-1.5 px-4 touch-none max-w-sm sm:max-w-xl w-full"
					style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
				>
					{/** biome-ignore lint/a11y/noStaticElementInteractions: ignore */}
					<div
						className="flex w-fit items-center gap-2 text-xs text-gray-500 cursor-grab active:cursor-grabbing select-none"
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={() => setDragging(false)}
						onDoubleClick={() => setPos({ x: 0, y: 0 })}
					>
						<span className="relative flex size-2">
							<span className="absolute inline-flex size-full rounded-full bg-shell-indicator opacity-60 animate-ping" />
							<span className="relative inline-flex size-2 rounded-full bg-shell-indicator" />
						</span>
						<span>chill a bit — on repeat lately</span>
					</div>

					<iframe
						id="embedPlayer"
						title="media-player"
						allow="autoplay *; encrypted-media *;"
						height="450"
						sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
						src="https://embed.music.apple.com/jp/playlist/on-repeat-lately/pl.u-GgA55kzcZWdGNl9"
						className="w-full border-none rounded-xl opacity-90 transition-opacity duration-300 hover:opacity-100"
						loading="lazy"
					/>
				</div>
			</div>

			<div className="center gap-3">
				<span className="text-xs text-gray-500">dh. OS</span>
			</div>
		</div>
	);
};
