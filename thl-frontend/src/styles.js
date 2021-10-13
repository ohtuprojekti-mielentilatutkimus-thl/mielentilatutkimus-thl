
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    form: {
        display: 'center',
        background: 'white',
        padding: '10px',
        borderWidth: '1px',
        align: 'center'
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
        justifyContent: 'center',
        align: 'center'
    },
    tablecell: {
        fontSize: 14
    },
    tablerow: {
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }
})

export { useStyles }