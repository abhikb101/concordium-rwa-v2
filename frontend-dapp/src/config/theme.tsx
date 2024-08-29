import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
	palette: {
		mode: "dark",
		primary: {
			main: "#0f0",
		},
		background: {
			default: "#111111",
			paper: "#212121",
		},
		text: {
			primary: "#ffffff", // Adding primary text color
			secondary: "#a5d6a7", // Optionally, you can define secondary as well
		},
	},
	spacing: 8,
	shape: {
		borderRadius: 4,
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: "#0f0", // Link color based on primary color
					textDecoration: "none", // No underline
					"&:hover": {
						textDecoration: "underline", // Underline on hover
					},
					"&:active": {
						color: "#ffffff", // Active state color
						textDecoration: "underline", // Underline on active
					},
					"&:visited": {
						color: "#a5d6a7", // Visited link color (light green)
					},
				},
			},
		},
		MuiBreadcrumbs: {
			styleOverrides: {
				root: {
					color: "#a5d6a7", // Light green for breadcrumbs
				},
				separator: {
					color: "#ffffff", // White color for breadcrumb separator
				},
				ol: {
					alignItems: "center", // Align breadcrumbs to the center
				},
			},
		},
	},
};

export const uiCustomizations = {
	headerTitle: "AdminPannel",
};
