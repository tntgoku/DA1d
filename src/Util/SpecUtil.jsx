export const parseSpecValue = (value, type) => {
  if (type === "number") {
    return value === "" ? "" : Number(value);
  }
  return value;
};

export const isTextSpec = (spec) => !spec.unit_id && !spec.unit;

export const mergeSpecsWithDefaults = (dbSpecs, defaultSpecs) => {
  if (!dbSpecs || dbSpecs.length === 0) return defaultSpecs;
  console.log("DefaultSpec",defaultSpecs);
  console.log("Database Spec",dbSpecs);
  
  return defaultSpecs.map((def) => {
    const match = dbSpecs.find((db) => db.value === def.name);
    return {
      ...def,
      ...match,
      label: def.label,
      unit: def.unit || match?.unitName || null,
    };
  });
};

// 🔹 Chuyển mảng specifications [{value, label}] => object {0:{},1:{},...}
export const mapSpecsToObject = (specArray) => {
  const obj = {};
  specArray.forEach((s, i) => {
    obj[i] = s;
  });
  return obj;
};
