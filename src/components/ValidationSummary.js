import React from 'react';
import { Badge } from 'design-react-kit';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getValidationSummary } from '../redux/selectors.js';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  error: {
    backgroundColor: 'var(--danger)',
  },
  warning: {
    backgroundColor: 'var(--warning)',
    color: 'var(--warning-text-dark)',
  },
});

const ValidationSummary = ({ summary }) => {
  const classes = useStyles();
  if (summary === null) return null;

  return (
    <div className="d-flex p-3 bg-primary">
      <h4 className="pr-3">
        <Badge data-testid="errors-badge" className={classes.error} pill={false} tag="span">
          {summary.errors} errors
        </Badge>
      </h4>
      <h4>
        <Badge data-testid="warnings-badge" className={classes.warning} pill={false} tag="span">
          {summary.warnings} warnings
        </Badge>
      </h4>
    </div>
  );
};

ValidationSummary.propTypes = {
  summary: PropTypes.exact({
    errors: PropTypes.number.isRequired,
    warnings: PropTypes.number.isRequired,
  }),
};

export default connect((state) => ({
  summary: getValidationSummary(state),
}))(ValidationSummary);
