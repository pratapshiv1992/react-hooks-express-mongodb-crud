import React, {useState,useEffect} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {callAPi} from '../utils/callApi';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: theme.spacing.unit * 6,
        maxWidth: 500,
        margin:'auto',
        border: '1px solid black',
        padding: theme.spacing.unit * 5,
        marginTop: theme.spacing.unit * 3,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
        display:'block'
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    date:{
        flexBasis: 200,
        display:'block',
        marginLeft: theme.spacing.unit * 1.5,
    }
});

const CreatePost = (props)=> {
    const [text, setTextFn] = useState();
    const {classes, editMode, match:{params:{id}}, history:{ goBack,push}} = props;
    const params = {
        url: editMode ? `/post/update/${id}` : "/post/create",
        method: editMode ? "put" : "post",
    }

    useEffect(()=>{
        if(editMode){
            console.log('edit mode');
        }
    },[]);

    const handleSubmit = (e,{url,method})=>{
        e.preventDefault();
        if(text){
            callAPi({
                url,
                method,
                data:{text}
            }).then((result)=>{
                if(result.status){
                    alert('operation successfull');
                    push('/');
                }
            })
        }else{
            alert('Please fill all the required field');
        }
    }


    return (
            <div className={classes.root}>
                <form className={classes.container} noValidate>
                    <Typography align='center' color='primary' variant='h5' gutterBottom >{ editMode ? 'Modify Post' : 'Add Post '}</Typography>
                    <TextField
                        id="outlined-simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label={ editMode ? "Update Post" : "Write post"}
                        value={text}
                        onChange={({target:{value}})=>setTextFn(value)}
                        fullWidth
                        multiline={true}
                        rows={6}
                        rowsMax={8}
                    />
                    { editMode && <Typography variant="h5" component="h5" style={{paddingLeft:"16px"}} > Likes : {0}</Typography> }
                    { editMode && <Typography variant="h5" component="h5" style={{paddingLeft:"16px"}}> Created on :  {new Date().toLocaleString()}</Typography> }

                    { editMode &&
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={(e)=>handleSubmit(e,params)}
                    >
                        Update
                    </Button>
                    }
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={(e)=>handleSubmit(e,params)}
                      disabled = {!text}
                    >
                        {editMode ? 'DELETE ':'ADD' }
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={()=>goBack()}>
                        GO BACK
                    </Button>
                </form>
            </div>
        );
}

CreatePost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreatePost);
