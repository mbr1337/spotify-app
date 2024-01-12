import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        h2: {
            fontSize: 30,
        },
        h3: {
            fontSize: 26
        },
        h4: {
            fontSize: 22
        },
        h5: {
            fontSize: 18
        },
        h6: {
            fontSize: 16
        },
        fontFamily: 'AileronThin'
    },
    palette: {
        // text: {
        //     primary: grey.A400,
        // },
        background: {
            default: 'rgb(30,30,30)',
            dimmed: 'rgb(35,35,35)',
        },
    },
});

export default theme;