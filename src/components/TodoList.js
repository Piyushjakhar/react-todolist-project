import React, {Component} from 'react';
import Todo from "./Todo"


class TodoList extends Component {
    constructor(props) {
        super(props);

    this.state = {
        text: "",
        todos: ["hi","bye"]
    };
    
}

handleChange = (e) => {
    this.setState({
        text: e.target.value
    })
   
}

handleSubmit = (e) => {
    e.preventDefault();
   const name = this.state.text;
        this.setState({
            todos: [name,...this.state.todos]
            
        })
        
        
     this.setState({
         text: ""
     })
     

        

}


    render() {
        return(
            <>
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange}></input>
                <button onClick={this.handleSubmit}>Add Todo</button>
            </form>

            {this.state.todos.map(todo => {
               return <Todo todo={todo} />
            })}

            </>
        )
        
    }

}

export default TodoList;