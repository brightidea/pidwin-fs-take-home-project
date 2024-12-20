import { theme } from "../../themes/Default";
import { deepPurple } from "@mui/material/colors";

export const styles = {
    appBar: {
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
    },
    logo: { width: "100px" },
    avatar: {
        display: "flex",
        color: "grey",
        gap: 1,
        textTransform: "capitalize",
    },
    avatarText: {
        display: "flex",
        flexDirection: "column",
        gap: 0,
        padding: 0,
        margin: 0,
    },
    heading: {
        color: "rgba(0,183,255, 1)",
        textDecoration: "none",
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        width: "1000px",
    },
    profile: {
        display: "flex",
        justifyContent: "space-between",
        width: "600px",
    },
    userName: {
        display: "flex",
        alignItems: "center",
        lineHeight: 1,
        margin: 0,
        padding: 0,
    },
    brandContainer: {
        display: "flex",
        alignItems: "center",
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    logout: {
        marginLeft: "20px",
    },
};
