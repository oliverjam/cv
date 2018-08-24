module.exports = ({
  title = 'Oliver Phillips CV',
  sprite,
  styles,
  html,
}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
    <style>${styles}</style>
  </head>
  <body>
    ${sprite}
    ${html}
  </body>
</html>
`;
