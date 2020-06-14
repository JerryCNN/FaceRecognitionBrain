import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageurl,box}) => {
	return (
		<div className = 'center ma'>
			<div className = 'absolute mt2'>
				<img id = 'inputimage' alt='' src = {imageurl} width = '500px' height='auto'/>
				<div className = 'bounding-box' style = {{top:box.topRow,left:box.leftcol,right:box.rightcol,bottom:box.bottomRow}}></div>
			</div>
		</div>
		)
}

export default FaceRecognition;