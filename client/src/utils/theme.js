import { createMuiTheme } from '@material-ui/core/styles';

const overrides = {
    MuiTab: {
        // general overrides for your material tab component here
        root: {
            textDecoration: 'none',
            backgroundColor: 'rgba(0,0,0,.5)',
            '&$selected': {
                backgroundColor: 'rgba(255, 255, 255, .85)',
            },
        },
    },
    MuiInputLabel: {
        root: {
            color: '#666'
        }
    },
};

const options = {
    palette: {
        primary: {
            main: '#6E61C0',
        },
        transparentWhite: {
            main: 'rgba(255, 255, 255, .85)',
        },
        transparentBlack: {
            main: 'rgba(0,0,0,0.5)',
        },
        black: {
            main: '#000',
        },
        white: {
            main: '#FFF',
        },
        warning: {
            main: '#FF4242',
        },
        success: {
            main: '#73EB69'
        }
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        htmlFontSize: 16,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        fontSize: 16,
        h1: {
            fontSize: '3.75rem',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '1.125rem',
            fontStyle: 'italic',
            textTransform: 'uppercase'
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '.75rem',
            fontStyle: 'italic',
            textTransform: 'uppercase'
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '.09rem',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '.09rem',
        },
        h5: {
            fontSize: '1.2rem',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '0rem',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            fontFamily: 'Poppins, sans-serif'
        },
        button: {
            fontSize: '1.2rem',
            fontWeight: 500,
            fontFamily: 'Poppins, sans-serif',
            textTransform: 'capitalize',
            textDecoration: 'underline',
            whiteSpace: 'nowrap'
        }
    },
    spacing: (...nums) => {
        let returnString = '';
        nums.forEach(num => {
            returnString += `${num}rem `;
        });
        return returnString;
    },
    overrides
}

const theme = createMuiTheme(options)

export default theme;