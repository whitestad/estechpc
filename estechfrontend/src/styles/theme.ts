import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface TypographyVariants {
        actayWide: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        actayWide?: React.CSSProperties;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        actayWide: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#C4F230",
            contrastText: "#111111",
        },
        secondary: {
            main: "#FF407D",
            contrastText: "#ffffff",
        },
        background: {
            default: "#111111",
            paper: "#000000",
        },
        text: {
            primary: "#fff",
            secondary: "#c2c2c2",
        },
        info: {
            main: "#307ef2",
            contrastText: "#ffffff",
        },
    },
    typography: {
        fontFamily: "Manrope",
        h1: {
            fontFamily: "ActayWide",
            fontWeight: 700,
        },
        h2: {
            fontFamily: "ActayWide",
            fontWeight: 700,
        },
        h3: {
            fontFamily: "ActayWide",
            fontWeight: 700,
        },
        h4: {
            fontFamily: "ActayWide",
            fontWeight: 700,
        },
        h5: {
            fontFamily: "ActayWide",
            fontWeight: 700,
        },
        h6: {
            fontFamily: "ActayWide",
            fontWeight: 700,
        },
        button: {
            fontFamily: "Manrope",
        },
    },

    shape: {
        borderRadius: 4,
    },
});

export default theme;
