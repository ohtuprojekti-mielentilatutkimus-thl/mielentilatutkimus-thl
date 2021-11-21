
import { makeStyles, createTheme } from '@material-ui/core/styles'

const bg_color = '#F8F8F8'
const primary_color = '#24242E'
const secondary_color = '#595050'

const theme = createTheme({
    typography: {
        h4: {
            color: primary_color,
            fontWeight: 'bold',
        },
    },
})

const useStyles = makeStyles({
    form: {
        display: 'center',
        background: 'white',
        padding: '10px',
        borderWidth: '1px',
        width: '50%',
        height: '50%'
    },
    page: {
        marginLeft: '100px',
        marginRight: '100px',
        marginTop: '50px',
        display: 'center',
        align: 'center',
    },
    text: {
        fontSize: '18px',
        color: secondary_color
    },
    labelText: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: primary_color
    },
    tablecell: {
        fontSize: 14
    },
    tablerow: {
        '&:last-child td, &:last-child th': {
            border: 0,
        }
    },
    app: {
        backgroundColor: bg_color,
        width:'100%',
        height:'100%',
        top:'0',
        left: '0'
    },
})

export { useStyles, theme }