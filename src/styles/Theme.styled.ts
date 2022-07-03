export const light = {
    name: "light-theme",
    colors: {
        background: {
            primary: "#ffffff",
            secondary: "#e8e8e8",
        },
        button: {
            primary: "#7948df",
            secondary: "#F25E95",
        },
        shadow: {
            primary: "#262626",
            secondary: "#000000",
        },
        text: {
            primary: "#0D0D0D",
            secondary: "#e8e8e8",
        },
    },
    borderRadius: {
        small: "5px",
        medium: "12px",
        large: "25px",
        circle: "50%"
    },
    shadow: {
        small: "3px 3px",
        medium: "5px 5px"
    }
};

export const dark = {
    name: "dark-theme",
    colors: {
        background: {
            primary: "#ffffff",
            secondary: "#e8e8e8",
        },
        button: {
            primary: "#b4b4b4",
            secondary: "#F25E95",
        },
        shadow: {
            primary: "#262626",
            secondary: "#000000",
        },
        text: {
            primary: "#0D0D0D",
            secondary: "#e8e8e8",
        },
    },
    borderRadius: {
        small: "5px",
        medium: "12px",
        large: "25px",
        circle: "50%"
    },
    shadow: {
        small: "3px 3px",
        medium: "5px 5px"
    }
};

export const mouse = {
    name: "mouse-theme",
    colors: {
        background: {
            primary: "#F25E95",
            secondary: "#F285AD",
        },
        button: {
            primary: "#755E8C",
            secondary: "#F25E95",
        },
        shadow: {
            primary: "#262626",
            secondary: "#000000",
        },
        text: {
            primary: "#0D0D0D",
            secondary: "#e8e8e8",
        },
    },
    borderRadius: {
        small: "5px",
        medium: "12px",
        large: "25px",
        circle: "50%"
    },
    shadow: {
        small: "3px 3px",
        medium: "5px 5px"
    }
};


export interface Theme {
    name: string;
    colors: {
        background: {
            primary: string;
            secondary: string;
        },
        button: {
            primary: string;
            secondary: string;
        },
        shadow: {
            primary: string;
            secondary: string;
        },
        text: {
            primary: string;
            secondary: string;
        },
    },
    borderRadius: {
        small: string;
        medium: string;
        large: string;
        circle: string;
    },
    shadow: {
        small: string;
        medium: string;
    }
};

// b: "#23272A",
// b1: "#2C2F33",
// b2: "#99AAB5",
// white:"#ffffff",
// blurple: "#7289DA",