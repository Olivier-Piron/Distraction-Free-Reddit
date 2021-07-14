class App extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = { value: '', results: [] };
      this.delayedCallback = _.debounce(this.ajaxCall, 1000);
    }

    ajaxCall(event) {
        axios.get(`https://www.reddit.com/search.json?q=${event.target.value}`).
        then(res => {
            const results = res.data.data.children.map(obj => obj.data);
            this.setState({ results });
            console.log(results)
        });
    }

    onChange(event) {
        event.persist();
        this.delayedCallback(event);
    }

    render() {
        return (
            React.createElement("div", {className: "w-full text-center"}, 

                React.createElement("input", { className: "bg-gray-100 w-full p-2 rounded-lg", type: "text", placeholder: "Search", onChange: this.onChange.bind(this) }),

                React.createElement("div", { className: "relative search-results" },
                this.state.results.map((result) => 
                    React.createElement("div", { className: "relative w-full lg:w-3/4 mx-auto bg-white border border-grey-light-alt rounded m-4 p-4 text-left", key: result.id }, React.createElement("a", { className:"ml-2" ,href: `https://www.reddit.com${result.permalink}` }, 'r/' + result.subreddit, 
                        React.createElement("span", { className: "author text-grey-light mx-1 text-xxs"}, '• Posted by u/' + result.author ),
                        React.createElement("p", { className: "title text-lg font-medium mb-1 ml-2 hover:underline"}, result.title )))
                )
                )
            ));
      }
}



    ReactDOM.render( 
        React.createElement(App, null),
        document.getElementById('root')
    );