import React from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); 

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function CustomizedBreadcrumbs(props) {
  return (
    <Breadcrumbs aria-label="breadcrumb" style ={ props.style ? props.style : {margin: '20px 0px 0px 50px'}}>
      <StyledBreadcrumb
        component="a"
        href="/home"
        label="Home"
        icon={<HomeIcon fontSize="small" />}
      />
      {/* <StyledBreadcrumb component="a" href="#" label="Catalog" onClick={handleClick} /> */}
      <StyledBreadcrumb
        label={props.name}
        deleteIcon={<ExpandMoreIcon />}
      />
    </Breadcrumbs>
  );
}

export {CustomizedBreadcrumbs};