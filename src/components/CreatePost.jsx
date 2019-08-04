import React, {useState,useEffect} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import {callAPi} from '../utils/callApi';
import InfoDialog from '../common/InfoDialog';

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
    },
    createdAt:{
        paddingLeft:"16px",
        fontVariant: "diagonal-fractions",
        fontWeight: 700,
        color: "cadetblue"
    },
    like:{
        paddingLeft:"16px",
        fontWeight: 700,
        color: "cadetblue"
    }
});

const defaultState = {
    text:null,
    createdAt:null,
    like:null
};

const CreatePost = ({classes,editMode,match:{params:{id}},history:{goBack,push}})=> {
    const [state, setState] = useState(defaultState);
    const [open,setDialog] = useState(false);
    const [isFormValueChanged,setFormValueChanged] = useState(false);
    const [hasLiked,setHasLiked] = useState(false);
    const {text,createdAt,like} = state;
    const params = {
        url: editMode ? `/post/update/${id}` : "/post/create",
        method: editMode ? "put" : "post",
    }

    useEffect(()=>{
        if(editMode){
            callAPi({
                url:`/post/listing?id=${id}`,
                method:'get',
            }).then((result)=>{
                if(result.status=== 200){
                    const {data} = result;
                    const [object] = data;
                    setState({
                        ...object
                    });
                }
            })
        }
    },[]);

    const handleSubmit = (e,{url,method},actionType)=> {
        const isDeleteOperation = editMode && actionType && actionType === 'DELETE';
        if(isDeleteOperation){
            method = 'delete';
        }
        if(text || isDeleteOperation){
            callAPi({
                url,
                method,
                data:{text,like}
            }).then((result)=> {
                setDialog(true);
                setTimeout(()=> {
                    setDialog(false);
                    push('/');
                },1500);
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
                        label={ editMode ? "" : "Write post"}
                        name="text"
                        value={text}
                        onChange={({target:{value,name}})=>{
                            setState({...state,[name]:value})
                            setFormValueChanged(true);
                        }}
                        fullWidth
                        multiline={true}
                        rows={6}
                        rowsMax={8}
                    />
                    { editMode && <Typography variant="h5" component="h6" className={classes.createdAt} >
                        Created on :  {new Date(createdAt).toGMTString()}
                        </Typography>
                    }
                    { editMode && <Typography variant="h5" component="h5" className={classes.like} >
                        Likes : {like}
                        <hr/>
                        Hit <ThumbUp onClick={()=> {
                            if(!hasLiked) {
                                setState({...state, like: state.like + 1});
                                setFormValueChanged(true);
                                setHasLiked(true);
                            }}} color='primary' />
                    </Typography> }

                    { editMode &&
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={(e)=>handleSubmit(e,params)}
                      disabled = {!text || !isFormValueChanged }
                    >
                        Update
                    </Button>
                    }
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={(e)=>handleSubmit(e,params,"DELETE")}
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
                <InfoDialog
                    open={open}
                    handleClose={(e)=>setDialog(false)}
                    title={"Message"}
                    text={"Operation Successfully Completed"}
                />
            </div>
        );
}

CreatePost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreatePost);
