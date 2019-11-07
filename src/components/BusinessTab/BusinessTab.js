import React, {useRef, useEffect} from 'react';
import classes from './BusinessTab.module.css';

const BusinessTab = (props) => {


	const switchBusinessTab = (e) => {
		if(e.target.nodeName=='BUTTON'){
			return false;
		}
		let currentId = props.business.id;
		props.switchBusinessTab(currentId);
	}

	const showRemovePopUp = () => {

		document.getElementById('popUpContainer').style.display="block";
		document.getElementById('cover').style.display="block";

	}

	const hideRemovePopUp = () => {
		document.getElementById('popUpContainer').style.display="none";
		document.getElementById('cover').style.display="none";
	}

	const deleteBusiness = () => {

		props.deleteBusiness(props.business.id)
		hideRemovePopUp();
	}

	const editBusinss = ()=>{
		alert('nothing')
	}

	let popUpMessage = (
			<div id="popUpContainer" className={classes.popUpContainer}>
				<p className={classes.popUpContainer_message}>Are you sure you want to delete this business?</p>
				<button onClick={deleteBusiness} className={classes.yesBtn}>YES</button>
				<button onClick={hideRemovePopUp} className={classes.noBtn}>NO</button>
				<a onClick={hideRemovePopUp} href="#" className={classes.close}/>
			</div>
		)

	let selectedTabLine = null;

	if(props.business.isShown){
		selectedTabLine = <span className={classes.selectedTab}></span> 
	}

	let currentStopwatchTime = props.business.currentStopwatchTime;
	let hours = currentStopwatchTime.hours;
	let minutes = currentStopwatchTime.minutes;
	let seconds = currentStopwatchTime.seconds;

	let timerOn = props.business.timerOn;
	let timerTime = props.business.timerTime;

	const tabTimeRef = useRef();

	const green = classes.green;
	const orange = classes.orange;
	const grey = classes.grey;


	useEffect(()=>{
		if(timerOn){
			tabTimeRef.current.classList.remove(orange);
			tabTimeRef.current.classList.remove(grey);
			tabTimeRef.current.classList.add(green);
		}
		else if(!timerOn && timerTime=='0'){
			tabTimeRef.current.classList.remove(green);
			tabTimeRef.current.classList.remove(orange);
			tabTimeRef.current.classList.add(grey);
		}
		else if (!timerOn && timerTime>0){
			tabTimeRef.current.classList.remove(green);
			tabTimeRef.current.classList.add(orange);
			tabTimeRef.current.classList.remove(grey);		}
	},[timerOn, timerTime])


	return(
		<div onClick={(e)=>switchBusinessTab(e)} className={classes.businessTab}>
			{selectedTabLine}
			<span ref={tabTimeRef} className={classes.tabTime}>{hours}:{minutes}:{seconds}</span>
			<span className={classes.businessTitle}>{props.business.title}</span>
			 <br/>
			<span className={classes.progress}>{props.business.hours}/{props.business.goalHours} hours</span><br/>
			{/* <button onClick={editBusinss} className={classes.btnEdit}>Edit</button><br/>
			<button onClick={showRemovePopUp} className={classes.btnDelete}>DELETE</button> */}

			{popUpMessage}
			<div 
				id='cover'
				className={classes.cover}
				onClick={hideRemovePopUp}>
			</div>

		</div>
		)
}

export default BusinessTab;