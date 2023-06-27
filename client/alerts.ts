import Toastify from "toastify-js";
export namespace Alert {
	const show = function(message: string, options?: any, style?: any)
	{
		Toastify({
			text: message,
			close: true,
			gravity: "top", // `top` or `bottom`
			position: "center",
			stopOnFocus: true, // Prevents dismissing of toast on hover
			style: {
				fontSize: "16pt",
				fontWeight: "600",
				color: "var(--lighter)",
				width: "98%",
				maxWidth: "900px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				borderRadius: "8px",
				padding: "16px",
				...style
			},
			...options
		}).showToast();
	}
	export function success(message: string, options?: any)
	{
		show(message, null, {
			backgroundColor: "var(--balanced)",
		});
	}

	export function error(message: string, options?: any)
	{
		show(message, null, {
			backgroundColor: "var(--assertive)",
		});
	}

	export function warning(message: string, options?: any)
	{
		show(message, null, {
			backgroundColor: "var(--energized)",
			color: "var(--dark)",
		});
	}

	export function information(message: string, options?: any)
	{
		show(message, null, {
			backgroundColor: "var(--positive-darker)",
		});
	}
}
