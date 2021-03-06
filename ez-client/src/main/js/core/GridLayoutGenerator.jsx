
class GridLayoutGenerator {}

GridLayoutGenerator.generateSingle = (nbCols, configuration) => {
  let widgetConfigs = configuration.widgets;
  let layout = [];
  let defaultProps = { w:1, h:2 };
  let xCounter = 0;
  let yCounter = 0;

  widgetConfigs.forEach((widgetConfig) => {
    let widgetGridConfig = Object.assign({}, defaultProps, {
      i: widgetConfig.key,
      x: xCounter++,
      y: yCounter
    });
    layout.push(widgetGridConfig);
    if (xCounter == nbCols) {
      yCounter++;
      xCounter = 0;
    }
  });
  return layout;
};

GridLayoutGenerator.generate = (config) => {
  let cols = config.grid.cols;
  let layouts = {
    lg: GridLayoutGenerator.generateSingle(cols.lg, config),
    md: GridLayoutGenerator.generateSingle(cols.md, config),
    sm: GridLayoutGenerator.generateSingle(cols.sm, config),
    xs: GridLayoutGenerator.generateSingle(cols.xs, config),
    xxs: GridLayoutGenerator.generateSingle(cols.xxs, config)
  };
  return layouts;
};

export default GridLayoutGenerator;
