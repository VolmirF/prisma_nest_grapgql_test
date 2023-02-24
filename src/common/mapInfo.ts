function mapSelections(selections) {
  const keys = {};
  selections.forEach((item) =>
    item.selectionSet
      ? (keys[item.name.value] = mapSelections(item.selectionSet.selections))
      : (keys[item.name.value] = true),
  );
  return { select: keys };
}

export function mapInfo(info: any): any {
  return mapSelections(info.fieldNodes[0].selectionSet.selections);
}
