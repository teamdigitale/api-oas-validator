export const getValidationSummary = (state) => {
  if (state.validationState.inProgress || state.validationState.results === null) {
    return null;
  }

  const summary = {
    errors: state.validationState.results.filter((r) => r.severity === 1).length,
    warnings: state.validationState.results.filter((r) => r.severity !== 1).length,
  };

  return summary;
};

export const getValidationResultsInfo = (state) => {
  if (state.validationState.inProgress || state.validationState.results === null) {
    return [];
  }

  const resultsInfo = state.validationState.results.map((r) => ({
    fingerprint: r.fingerprint,
    severity: r.severity,
    line: r.range.start.line,
    character: r.range.start.character,
    message: r.message,
  }));

  return resultsInfo;
};

export const isValidationInProgress = (state) => state.validationState.inProgress;

export const isMenuDisplayed = (state) => state.menuState.isMenuDisplayed;

export const getDocumentText = (state) => state.documentState.text;
