const {h, render, Component} = window.preact;

const Button = (props) => (
  h('button', {onClick: props.onClick}, props.text)
);

const Hello = (props) => (
  h('div', null, [
    Button(props),
    `hello ${props.ip}`
  ])
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      count: 0
    };
    this.increment = this.increment.bind(this);
  }
  async componentDidMount() {
    const res = await fetch('https://httpbin.org/get');
    const json = await res.json();
    this.setState({ip: json.origin});
  }
  increment() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return Hello({
      text: this.state.count,
      onClick: this.increment,
      ip: this.state.ip
    });
  }
};

render(h(App), document.getElementById('app'));
