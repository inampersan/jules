const { List, AutoSizer, CellMeasurer, CellMeasurerCache } = ReactVirtualized;
const { List: AntList, Avatar } = antd;

const rowCount = 1000; // Or any large number of items

// Generate a large list of items
const list = Array.from({ length: rowCount }, (_, index) => ({
  id: index,
  name: `Item ${index}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
}));

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50  // Default height for items, can be adjusted
});

function renderRow({ index, key, style, parent }) {
  const item = list[index];
  return (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      <AntList.Item style={style}>
        <AntList.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={item.name}
          description={`Description for item ${index}`}
        />
      </AntList.Item>
    </CellMeasurer>
  );
}

function VirtualizedList() {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          rowCount={rowCount}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={renderRow}
          overscanRowCount={5} // Number of rows to render above and below the visible area
        />
      )}
    </AutoSizer>
  );
}

ReactDOM.render(<VirtualizedList />, document.getElementById('root'));
