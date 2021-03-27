import React from 'react'
import { connect } from 'react-redux';

const BlogHeader = ({translation}) => {
    return (
        <div className="section-sm" style={{paddingTop : '110px', background: '#cccccc'}}>
			<div className="container text-center">
				<h1 style={{color: '#908a8a'}}>{ translation === 'Hebrew' ? 'בלוג' : 'Blog'}</h1>
			</div>
		</div>
    )
}

const mapStateToProps = ({ pages }) => ({
	translation: pages.translation,
  });

export default connect(mapStateToProps)(BlogHeader)
