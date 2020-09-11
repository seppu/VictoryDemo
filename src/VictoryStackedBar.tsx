import React from "react";
// import PropTypes from "prop-types";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { VictoryStack } from "victory";
import { VictoryLabel } from "victory";
import { format } from "d3-format";
// import { VictoryBar } from "victory";

// import { VictoryContainer, VictoryTheme, VictoryLabel } from "victory";
// import { assign, random, range, merge } from "lodash";

// import VictoryCustomTheme from "./styles/VictoryCustomTheme";

const getStyles: any = () => {
  const BLUE_COLOR = "#00a3de";
  const RED_COLOR = "#7c270b";

  return {
    parent: {
      background: "#ccdee8",
      boxSizing: "border-box",
      display: "inline",
      padding: 0,
      fontFamily: "'Fira Sans', sans-serif"
    },
    title: {
      textAnchor: "start",
      verticalAnchor: "end",
      fill: "#000000",
      fontFamily: "inherit",
      fontSize: "18px",
      fontWeight: "bold"
    },
    labelNumber: {
      textAnchor: "middle",
      fill: "#ffffff",
      fontFamily: "inherit",
      fontSize: "14px"
    },

    // INDEPENDENT AXIS
    axisYears: {
      axis: { stroke: "black", strokeWidth: 1 },
      ticks: {
        size: ({ tick }: any) => {
          const tickSize = [10];
          return tickSize;
        },
        stroke: "black",
        strokeWidth: 1
      },
      tickLabels: {
        fill: "black",
        fontFamily: "inherit",
        fontSize: 16
      }
    },

    // DATA SET ONE
    axisOne: {
      grid: {
        stroke: ({ tick }: any) => (tick === -10 ? "transparent" : "#ffffff"),
        strokeWidth: 2
      },
      axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
      ticks: { strokeWidth: 0 },
      tickLabels: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontSize: 16
      }
    },
    labelOne: {
      fill: BLUE_COLOR,
      fontFamily: "inherit",
      fontSize: 12,
      fontStyle: "italic"
    },
    lineOne: {
      data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
    },
    axisOneCustomLabel: {
      fill: BLUE_COLOR,
      fontFamily: "inherit",
      fontWeight: 300,
      fontSize: 21
    },

    // DATA SET TWO
    axisTwo: {
      axis: { stroke: RED_COLOR, strokeWidth: 0 },
      tickLabels: {
        fill: RED_COLOR,
        fontFamily: "inherit",
        fontSize: 16
      }
    },
    labelTwo: {
      textAnchor: "end",
      fill: RED_COLOR,
      fontFamily: "inherit",
      fontSize: 12,
      fontStyle: "italic"
    },
    lineTwo: {
      data: { stroke: RED_COLOR, strokeWidth: 4.5 }
    },

    // HORIZONTAL LINE
    lineThree: {
      data: { stroke: "#e95f46", strokeWidth: 2 }
    }
  };
};

const styles = getStyles();

const VictoryStackedBar: React.FunctionComponent<any> = ({ data, keys }) => {
  return (
    // <svg style={styles.parent} viewBox="0 0 450 350" height={450} width={450}>
    //   {/* Create stylistic elements */}
    // {/* //   <rect
    //     x="0"
    //     y="0"
    //     width="10"
    //     height="30"
    //     fill={VictoryCustomTheme.color.red}
    //   />
    //   <rect
    //     x="420"
    //     y="10"
    //     width="20"
    //     height="20"
    //     fill={VictoryCustomTheme.color.black}
    //   /> */}
    //   {/* Define labels */}
    <VictoryChart height={300} width={400} domainPadding={{ x: 30, y: 20 }}>
      <VictoryLabel x={25} y={24} style={styles.title} text="Annual Revenue" />
      {/* <g transform="translate(0, 40)"> */}
      {/* Add shared independent axis */}
      <VictoryAxis
        // scale="time"
        standalone={false}
        // style={styles.axisYears}
        tickValues={data.map(({ scenario }: any) => scenario)}
      />
      {/*
        Add the dependent axis for the first data set.
        Note that all components plotted against this axis will have the same y domain
      */}
      <VictoryAxis
        dependentAxis
        offsetX={60}
        orientation="left"
        standalone={false}
        style={styles.axisOne}
        tickFormat={(t) => format("$.2s")(t)}
        // domain={[0,10]}
        // tickValues ={data.map(({ NS }: any) => NS)}
      />
      <VictoryStack colorScale={["#e8c1a0", "#f47560", "tomato"]}>
        <VictoryBar
          data={data.map(({ scenario, MD }: any) => [{ scenario, MD }][0])}
          // data={[
          //   { x: "Current", y: 991811 },
          //   { x: "Proposed", y: 829865 },
          //   { x: "Requested", y: 790000 }
          // ]}
          x="scenario"
          y="MD"

          // scale={{x: "scenario", y: "linear"}}
        />
        <VictoryBar
          data={data.map(({ scenario, MV }: any) => [{ scenario, MV }][0])}
          // data={[
          //   { scenario: "Current", MD: 672349 },
          //   { scenario: "Proposed", MD: 592364 },
          //   { scenario: "Requested", MD: 420000 }
          // ]}
          x="scenario"
          y="MV"
          // scale={{x: "scenario", y: "linear"}}
          labels={data.map(({ NS }: any) => format("$.2s")(NS))}
        />
      </VictoryStack>
      {/* </g> */}
    </VictoryChart>
    // {/* </svg> */}
  );
};

export default VictoryStackedBar;
// interface WrapperProps {
//   children?: React.ReactElement | React.ReactElement[];
// }

// class Wrapper extends React.Component<WrapperProps> {
//   static propTypes = {
//     children: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.node),
//       PropTypes.node
//     ])
//   };

//   renderChildren(props: WrapperProps) {
//     const children = React.Children.toArray(props.children);
//     return children.map((child: any) => {
//       return React.cloneElement(child, assign({}, child.props, props));
//     });
//   }

//   render() {
//     return <g>{this.renderChildren(this.props)}</g>;
//   }
// }

// type BarData = {
//   x: string | number;
//   y: string | number;
// }[][];

// interface VictoryBarDemoState {
//   barData: BarData;
//   barTransitionData: {
//     a: number;
//     b: number;
//   }[];
//   multiTransitionData: BarData;
//   numericBarData: BarData;
// }

// export default class VictoryBarDemo extends React.Component<
//   any,
//   VictoryBarDemoState
// > {
//   setStateInterval?: number = undefined;

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       barData: this.getBarData(),
//       barTransitionData: this.getBarTransitionData(),
//       multiTransitionData: this.getMultiTransitionData(),
//       numericBarData: this.getNumericBarData()
//     };
//   }

//   componentDidMount() {
//     this.setStateInterval = window.setInterval(() => {
//       this.setState({
//         barData: this.getBarData(),
//         barTransitionData: this.getBarTransitionData(),
//         multiTransitionData: this.getMultiTransitionData(),
//         numericBarData: this.getNumericBarData()
//       });
//     }, 5000);
//   }

//   componentWillUnmount() {
//     window.clearInterval(this.setStateInterval);
//   }

//   getBarData() {
//     return range(5).map(() => {
//       return [
//         {
//           x: "rabbits",
//           y: random(-5, 5)
//         },
//         {
//           x: "cats",
//           y: random(-10, 10)
//         },
//         {
//           x: "dogs",
//           y: random(-15, 15)
//         }
//       ];
//     });
//   }

//   getNumericBarData() {
//     return range(5).map(() => {
//       return [
//         {
//           x: random(1, 3),
//           y: random(1, 5)
//         },
//         {
//           x: random(4, 7),
//           y: random(1, 10)
//         },
//         {
//           x: random(9, 11),
//           y: random(0, 15)
//         }
//       ];
//     });
//   }

//   getBarTransitionData() {
//     const bars = random(6, 10);
//     return range(bars).map((bar) => {
//       return { a: bar + 1, b: random(2, 10) };
//     });
//   }

//   getMultiTransitionData() {
//     const bars = random(3, 5);
//     return range(4).map(() => {
//       return range(bars).map((bar) => {
//         return { x: bar + 1, y: random(2, 10) };
//       });
//     });
//   }

//   render() {
//     const parentStyle = {
//       border: "1px solid #ccc",
//       margin: "2%",
//       maxWidth: "40%"
//     };

//     const containerStyle: React.CSSProperties = {
//       display: "flex",
//       flexDirection: "row",
//       flexWrap: "wrap",
//       alignItems: "center",
//       justifyContent: "center"
//     };

//     return (
//       <div className="demo" style={containerStyle}>
//         <ChartWrap>
//           <VictoryBar
//             cornerRadius={4}
//             scale={{ y: "log", x: "linear" }}
//             horizontal
//             data={[
//               { x: 1, y: 0.1 },
//               { x: 2, y: 1 },
//               { x: 3, y: 10 },
//               { x: 4, y: 0 },
//               { x: 5, y: 0.1 },
//               { x: 6, y: 1 },
//               { x: 7, y: 10 },
//               { x: 8, y: 100 }
//             ]}
//           />
//         </ChartWrap>

//         <ChartWrap>
//           <VictoryBar
//             cornerRadius={5}
//             style={{ data: { width: 15, fill: "red" } }}
//             scale={{ x: "linear", y: "log" }}
//             data={[
//               { x: 1, y: 0.1 },
//               { x: 2, y: 1 },
//               { x: 3, y: 10 },
//               { x: 4, y: 100 },
//               { x: 5, y: 0.1 },
//               { x: 6, y: 1 },
//               { x: 7, y: 10 },
//               { x: 8, y: 100 }
//             ]}
//           />
//         </ChartWrap>
//         <ChartWrap>
//           <VictoryBar
//             horizontal
//             labels={({ datum }) => datum.y}
//             data={[
//               { x: 1, y: "Label 1" },
//               { x: 7, y: "Label 2" },
//               { x: 3, y: "Label 3" },
//               { x: 4, y: "Label 4" }
//             ]}
//           />
//         </ChartWrap>

//         <ChartWrap>
//           <VictoryBar
//             horizontal
//             labels={({ datum }) => datum.y}
//             data={[
//               { x: 1, y: 20 },
//               { x: 7, y: -40 },
//               { x: 3, y: -60 },
//               { x: 4, y: 80 }
//             ]}
//           />
//         </ChartWrap>

//         <ChartWrap>
//           <VictoryBar
//             labels={({ datum }) => datum.y}
//             data={[
//               { x: 1, y: 20 },
//               { x: 7, y: -40 },
//               { x: 3, y: -60 },
//               { x: 4, y: 80 }
//             ]}
//           />
//         </ChartWrap>

//         <VictoryChart domainPadding={{ y: 20 }}>
//           <VictoryBar
//             data={[
//               { x: 1, y: "Alpha" },
//               { x: 7, y: "Beta" },
//               { x: 3, y: "Charlie" },
//               { x: 4, y: "Delta" }
//             ]}
//           />
//         </VictoryChart>

//         <VictoryChart
//           style={{ parent: parentStyle }}
//           theme={VictoryTheme.material}
//         >
//           <VictoryBar
//             horizontal
//             alignment="start"
//             data={[
//               { x: 2, y: "Echo" },
//               { x: 6, y: "Foxtrot" },
//               { x: 3, y: "Golf" },
//               { x: 4, y: "Hotel" }
//             ]}
//           />
//         </VictoryChart>

//         <VictoryBar
//           style={{ parent: parentStyle }}
//           labels={() => "HELLO"}
//           labelComponent={
//             <VictoryLabel angle={45} verticalAnchor="end" textAnchor="end" />
//           }
//           animate={{
//             duration: 500,
//             onExit: {
//               duration: 1000
//             },
//             onEnter: {
//               duration: 500
//             }
//           }}
//           containerComponent={
//             <VictoryContainer
//               title="Bar Chart"
//               desc="This is an animated bar chart that displays data with labels."
//             />
//           }
//           events={[
//             {
//               target: "data",
//               eventHandlers: {
//                 onClick: () => {
//                   return [
//                     {
//                       mutation: (props) => {
//                         return {
//                           style: merge({}, props.style, { fill: "orange" })
//                         };
//                       }
//                     },
//                     {
//                       target: "labels",
//                       mutation: () => {
//                         return { text: "hey" };
//                       }
//                     }
//                   ];
//                 }
//               }
//             }
//           ]}
//           data={this.state.barTransitionData}
//           x="a"
//           y="b"
//         />
//         <VictoryStack
//           style={{ parent: parentStyle }}
//           animate={{ duration: 1000 }}
//         >
//           {this.state.multiTransitionData.map((data, index) => {
//             return (
//               <Wrapper key={index}>
//                 <VictoryBar data={data} />
//               </Wrapper>
//             );
//           })}
//         </VictoryStack>

//         <VictoryChart
//           style={{ parent: parentStyle }}
//           domainPadding={{ x: 30 }}
//           theme={VictoryTheme.material}
//         >
//           <VictoryGroup
//             offset={12}
//             animate={{ duration: 1000 }}
//             colorScale={"warm"}
//           >
//             {this.state.multiTransitionData.map((data, index) => {
//               return (
//                 <Wrapper key={index}>
//                   <VictoryBar key={index} data={data} />
//                 </Wrapper>
//               );
//             })}
//           </VictoryGroup>
//         </VictoryChart>

//         <VictoryGroup
//           style={{ parent: parentStyle }}
//           offset={18}
//           colorScale={"qualitative"}
//           animate={{ duration: 2000 }}
//         >
//           {this.getBarData().map((data, index) => {
//             return (
//               <VictoryBar key={index} data={data} labels={["a", "b", "c"]} />
//             );
//           })}
//         </VictoryGroup>

//         <VictoryGroup
//           horizontal
//           style={{ parent: parentStyle }}
//           offset={15}
//           colorScale={"cool"}
//           animate={{ duration: 2000 }}
//           labels={["a", "b", "c"]}
//         >
//           {this.getBarData().map((data, index) => {
//             return <VictoryBar key={index} data={data} />;
//           })}
//         </VictoryGroup>

//         <VictoryGroup
//           style={{ parent: parentStyle, data: { width: 20 } }}
//           offset={25}
//           animate={{ duration: 2000 }}
//         >
//           <VictoryStack colorScale={"red"}>
//             {this.getBarData().map((data, index) => {
//               return <VictoryBar key={index} data={data} />;
//             })}
//           </VictoryStack>
//           <VictoryStack colorScale={"green"}>
//             {this.getBarData().map((data, index) => {
//               return <VictoryBar key={index} data={data} />;
//             })}
//           </VictoryStack>
//           <VictoryStack colorScale={"blue"}>
//             {this.getBarData().map((data, index) => {
//               return <VictoryBar key={index} data={data} />;
//             })}
//           </VictoryStack>
//         </VictoryGroup>

//         <VictoryStack
//           style={{ parent: parentStyle }}
//           animate={{ duration: 2000 }}
//           colorScale={"warm"}
//           labels={["one", "two", "three"]}
//         >
//           {this.getBarData().map((data, index) => {
//             return <VictoryBar key={index} data={data} />;
//           })}
//         </VictoryStack>

//         <ChartWrap>
//           <VictoryBar
//             height={250}
//             data={[{ a: { b: { c: 1, d: 1 } } }, { a: { b: { c: 2, d: 3 } } }]}
//             x={"a.b.c"}
//             y={"a.b.d"}
//           />
//         </ChartWrap>

//         <VictoryStack colorScale="warm" style={{ parent: parentStyle }}>
//           <Wrapper>
//             <VictoryBar
//               data={[
//                 { x: "a", y: 2 },
//                 { x: "b", y: 3 },
//                 { x: "c", y: 4 }
//               ]}
//               events={[
//                 {
//                   target: "data",
//                   eventHandlers: {
//                     onClick: () => {
//                       return [
//                         {
//                           mutation: (props) => {
//                             return {
//                               style: merge({}, props.style, { fill: "orange" })
//                             };
//                           }
//                         }
//                       ];
//                     }
//                   }
//                 }
//               ]}
//             />
//           </Wrapper>
//           <VictoryBar
//             data={[
//               { x: "c", y: 2 },
//               { x: "d", y: 3 },
//               { x: "e", y: 4 }
//             ]}
//             events={[
//               {
//                 target: "data",
//                 eventHandlers: {
//                   onClick: () => {
//                     return [
//                       {
//                         mutation: (props) => {
//                           return {
//                             style: merge({}, props.style, { fill: "blue" })
//                           };
//                         }
//                       }
//                     ];
//                   }
//                 }
//               }
//             ]}
//           />
//         </VictoryStack>
//         <VictoryBar
//           theme={VictoryTheme.grayscale}
//           style={{
//             parent: parentStyle,
//             data: { fill: "blue" }
//           }}
//           labels={["a", "b", "c", "d", "e"]}
//           data={[
//             { x: 1, y: 1 },
//             { x: 2, y: 2 },
//             { x: 3, y: 3, label: "click me" },
//             { x: 4, y: 2 },
//             { x: 5, y: 1 }
//           ]}
//           events={[
//             {
//               target: "data",
//               eventKey: 2,
//               eventHandlers: {
//                 onClick: (evt) => {
//                   evt.stopPropagation();
//                   return [
//                     {
//                       mutation: () => {
//                         return { style: { fill: "orange" } };
//                       }
//                     }
//                   ];
//                 }
//               }
//             },
//             {
//               target: "parent",
//               eventHandlers: {
//                 onClick: () => {
//                   return [
//                     {
//                       target: "labels",
//                       mutation: () => {
//                         return { text: "o shit" };
//                       }
//                     }
//                   ];
//                 }
//               }
//             }
//           ]}
//         />

//         <VictoryChart>
//           <VictoryBar
//             horizontal
//             data={[
//               { x: 21, y: "Label 1" },
//               { x: 28, y: "Label 2" },
//               { x: 35, y: "Label 3" },
//               { x: 40, y: "Label 4" }
//             ]}
//             x={"y"}
//             y={"x"}
//           />
//         </VictoryChart>

//         <VictoryChart>
//           <VictoryBar
//             data={[
//               [5, 10],
//               [10, 15],
//               [15, 20],
//               [20, 25]
//             ]}
//             x={0}
//             y={1}
//           />
//         </VictoryChart>
//       </div>
//     );
//   }
// }

// interface ChartWrapProps {
//   children?: any;
//   height?: number;
//   weight?: number;
// }

// class ChartWrap extends React.Component<ChartWrapProps> {
//   static defaultProps = {
//     height: 250,
//     width: 350
//   };
//   // renders both a standalone chart, and a version wrapped in VictoryChart,
//   // to test both cases at once
//   render() {
//     const parentStyle = {
//       border: "1px solid #ccc",
//       margin: "2%",
//       maxWidth: "40%"
//     };

//     return (
//       <div style={parentStyle}>
//         {React.cloneElement(this.props.children)}
//         <VictoryChart {...this.props}>{this.props.children}</VictoryChart>
//       </div>
//     );
//   }
// }
