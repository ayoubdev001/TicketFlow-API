
export default function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const err = new Error('Validation failed');
      err.statusCode = 400;
      err.details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return next(err);
    }

    
    req.body = result.data;
    next();
  };
}