import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root:{
        margin:"auto"
    },
    link: {
        margin: theme.spacing.unit,
    },
});

const linkedin = 'https://www.linkedin.com/in/pratapshiv1992/';
const github =   'https://github.com/pratapshiv1992/';
const repo =   'https://github.com/pratapshiv1992/post-on-it';

function AboutDev(props) {
    const { classes } = props;

    return (
        <div className={classes.link}>
            <Typography>
                <Link href={linkedin} className={classes.link} block underline='always' _blank >
                    Linkedin
                </Link>
                <Link href={github}  className={classes.link} block underline='always' _blank>
                    Github Profile
                </Link>
            </Typography>
            <Typography>
                <Link href={repo}  className={classes.link} block underline='always' _blank >Repository link</Link>
            </Typography>
            <Typography>
                Give star and fork this repository if you like it.
            </Typography>
        </div>
    );
}

AboutDev.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutDev);
