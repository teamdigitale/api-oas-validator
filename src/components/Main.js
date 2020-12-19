import React, { useRef } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Menu from './Menu.js';
import Editor from './Editor.js';
import ValidationController from './ValidationController.js';
import ValidationSummary from './ValidationSummary.js';
import ValidationResults from './ValidationResults.js';
import { isMenuDisplayed } from '../redux/selectors.js';

const useStyles = createUseStyles({
  animate: {
    transition: '0.3s ease-in-out',
  },
  'col-0': {
    flex: '0 0 0%',
    maxWidth: '0%',
  },
});

const Main = ({ isMenuDisplayed }) => {
  const classes = useStyles();

  // const handleValidation = useCallback(async () => {
  // setValidationInProgress(true);
  // editor.current.deltaDecorations(decoration.current, []);
  // const text = editor.current.getModel().getValue();
  // const document = new Document(text, Parsers.Yaml);
  // const spectral = await getSpectral();
  // const results = await spectral.run(document);
  // const newDecorations = [];
  // for (const result of results) {
  //   newDecorations.push({
  //     range: new monaco.Range(result.range.start.line, 1, result.range.end.line, 1),
  //     options: {
  //       isWholeLine: true,
  //       className: classes.editorHighlightLine,
  //       glyphMarginClassName: classes.editorMarginHighlightSev1,
  //     },
  //   });
  // }
  // decoration.current = editor.current.deltaDecorations([], newDecorations);
  // setValidationResults(results);
  // setValidationInProgress(false);
  // }, []);

  // const revealLine = useCallback(({ line, character }) => {
  //   editor.current.revealLineInCenter(line);
  //   editor.current.setPosition({ lineNumber: line, column: character });
  //   editor.current.focus();
  // }, []);

  const sideSection = cx(
    {
      'col-md-2': isMenuDisplayed,
      [classes['col-0']]: !isMenuDisplayed,
    },
    classes.animate
  );

  const mainSection = cx(
    {
      'col-md-6': isMenuDisplayed,
      'col-md-8': !isMenuDisplayed,
    },
    classes.animate
  );

  return (
    <main className="container-fluid p-0" data-testid="main">
      <div className="row no-gutters">
        <aside className={sideSection}>
          <Menu />
        </aside>
        <section className={mainSection}>
          <Editor />
        </section>
        <section className="col-md-4">
          <ValidationController />
          <ValidationSummary />
          <ValidationResults />
        </section>
      </div>
    </main>
  );
};

Main.propTypes = {
  isMenuDisplayed: PropTypes.bool.isRequired,
};

export default connect((state) => ({ isMenuDisplayed: isMenuDisplayed(state) }))(Main);
