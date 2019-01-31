import * as React from 'react';

interface InternalProps {
  className?: string;
  padding?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
}

export default class Wrapper extends React.Component<InternalProps> {

  public constructor(props: InternalProps) {
    super(props);
  }

  public render() {
    const { className, padding, paddingVertical, paddingHorizontal } = this.props;

    return (
      <div
        className={className}
        style={Object.assign({},
          padding ? { padding } : {},
          paddingVertical ? { paddingTop: paddingVertical, paddingBottom: paddingVertical } : {},
          paddingHorizontal ? { paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal } : {},
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
