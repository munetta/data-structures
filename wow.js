//unfinshed 
//author: alex
//recipitent: FRANKLIN YMCA MR C

//grid

let grid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
]; 

function placement_of_random_apples() { 
  for(let i = 0; i < grid.length; i++) { 
    for(let j = 0; j < grid[i].length; j++) { 
      let r = Math.min.random(0,4);
      if(r === 4) { 
        grid[i][j] = 2;
      }
    }
  }
}

let pause_timeout = false;

//the snake with a single leading node and trailing nodes
let snake = [{ 
  x: 0, 
  y: 0, 
  direction: 's', 
  type_: 'leading_node', 
  turns: []
}];  

//assigning a new direction to every node starting where the leading_node is
document.addEventListener('keydown', (event) => {
  pause_timeout = true;
  if(event.key ===  37) { 
    go_east();
  } else if(event.key ===  39) { 
    go_west();
  } else if(event.key ===  38) { 
    go_north();
  } else if(event.key ===  40) { 
    go_south();
  } else { 
    return;
  }
  pause_timeout = false;
});

function go_south() { 
  if(
    snake[0].direction === 's' || 
    snake[0].direction === 'n'
  ) {
    return;
  }
  for(let i = 0; i < snakes.length; i++) { 
    snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction: 's'
    })
  } 
} 

function go_north() { 
  if(
    snake[0].direction === 's' || 
    snake[0].direction === 'n'
  ) {
    return;
  }
  for(let i = 0; i < snakes.length; i++) { 
    snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction: 'n'
    })
  }
} 

function go_west() { 
  if(
    snake[0].direction === 'w' || 
    snake[0].direction === 'e'
  ) {
    return;
  }
  for(let i = 0; i < snakes.length; i++) { 
    snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction: 'w'
    })
  }
} 

function go_east() { 
  if(
    snake[0].direction === 'e' || 
    snake[0].direction === 'w'
  ) {
    return;
  }
  for(let i = 0; i < snakes.length; i++) { 
    snake[i].turns.push({
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction: 'e'
    })
  } 
} 

//moving each node of the snake in its current direction
function move_snake() { 

  for(let i = 0; i < snake.length; i++) { 

    //node has landed on its next turning point, turn the node and remove the turning point
    if(
      typeof snake[i].turns[0] !== 'undefined' && 
      snake[i].x === snake[i].turns[0].turn_at_x_coordinate && 
      snake[i].y === snake[i].turns[0].turn_at_y_coordinate 
    ) { 
      snake[i].direction = snake[i].turns[0].direction_for_node_to_turn_in;
      snake[i].turns.unshift();
    }

    //the leading node ran into an apple, use the last node to copy into the new last node
    if(i === 0 && grid[snake[i].x][snake[i].y] === 2) { 
      grid[snake[i].x][snake[i].y] = 0; 
      let last_node = snake[snake.length - 1];
      snake.push({ 
        x: last_node.direction === 'e' ? last_node.x -= 1 : last_node.direction === 'w' ? last_node.x += 1 : last_node.x, 
        y: last_node.direction === 'n' ? last_node.y -= 1 : last_node.direction === 's' ? last_node.y += 1 : last_node.y, 
        direction: last_node.direction, 
        type_: 'trailing_node', 
        turns: last_node.turns
      })
    }

    //evaluate direction
    if(snake[i].direction === 'n') {
      snake[i].y += 1;
    } else if(snake[i].direction === 's') { 
      snake[i].y -= 1;
    } else if(snake[i].direction === 'e') { 
      snake[i].x += 1;
    } else if(snake[i].direction === 'w') { 
      snake[i].x -= 1;
    }

    //if leading snake node and off the gird, player loses 
    if(i === 0 && typeof grid[snake[i].x][snake[i].y] === 'undefined') { 
      return { 
        error: true, 
        message: 'you ran into a wall'
      }
    }

  }

  display_snake();

}

function display_snake() { 

  for(let i = 0; i < grid.length; i++) { 
    for(let j = 0; j < grid[i].length; j++) { 
      if(grid[i][j] === 1) {
        grid[i][j] = 0;
      }
    }
  }

  for(let i = 0; i < snake.length; i++) { 
    grid[snake[i].x][snake[i].y] = 1; 
  }

  setTimeout(function() {
    if(!pause_timeout) {
      return move_snake();
    }
  }, 1000)

}

move_snake();
