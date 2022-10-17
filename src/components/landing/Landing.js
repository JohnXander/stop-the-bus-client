import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './style.css'
import Register from '../register/Register';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Landing = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    <Item>
                        <img
                            className='hero-img'
                            src="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"
                            alt="Hero"
                        />
                    </Item>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Item>
                        <Register />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Landing

