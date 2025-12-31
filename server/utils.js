/**
 * Parses a Typeform webhook payload into a flat key-value object.
 * This assumes you have set 'Ref' values in Typeform for each question 
 * (e.g., 'monthly_income', 'loan_amount').
 * 
 * If no Refs are set, it falls back to using the Question Title.
 */
export const parseTypeformResponse = (body) => {
  if (!body || !body.form_response || !body.form_response.answers) {
    return null;
  }

  const { answers, definition } = body.form_response;
  const parsedData = {};

  answers.forEach((answer) => {
    // 1. Try to get the "Ref" (best practice)
    let key = answer.field.ref;

    // 2. If Ref is missing or generic (starts with 'ref_'), try to find the Question Title
    if (!key || key.startsWith('ref_') || key.includes('-')) {
      const fieldDef = definition.fields.find(f => f.id === answer.field.id);
      if (fieldDef) {
        key = fieldDef.title; // Use the actual question text
      }
    }

    // 3. Extract Value based on Type
    let value = null;
    switch (answer.type) {
      case 'text': value = answer.text; break;
      case 'number': value = answer.number; break;
      case 'email': value = answer.email; break;
      case 'boolean': value = answer.boolean; break;
      case 'date': value = answer.date; break;
      case 'choice': value = answer.choice.label; break;
      case 'choices': value = answer.choices.labels.join(', '); break;
      default: value = JSON.stringify(answer[answer.type]);
    }

    // Clean up the key for better JSON readability if it was a sentence
    if (key) {
        const cleanKey = key.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
        parsedData[cleanKey] = value;
    }
  });

  // Add hidden fields if any (often used for User IDs)
  if (body.form_response.hidden) {
    Object.assign(parsedData, body.form_response.hidden);
  }

  return parsedData;
};