trying to make snake game. have not ran
  
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
<div id = 'grid'></div>
</body>

<script>

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

let wait_until_snake_is_done_updating_to_update_direction = 'waiting';

let snake = [{ 
  x: 0, 
  y: 0, 
  direction: 's', 
  type_: 'leading_node', 
  turns: []
}];  

function setup_grid() {

  for(let i = 0; i < grid.length; i++) { 
    for(let j = 0; j < grid[i].length; j++) { 
      let r = Math.min.random(0,4);
      if(r === 4) { 
        grid[i][j] = 2;
      }
    }
  }

  let div_element = ``;
  for(let i = 0; i < grid.length; i++) { 
    for(let j = 0; j < grid[i].length; j++) { 
      let color;
      if(grid[i][j] === 1) { 
        color = 'red';
      } else if(grid[i][j] === 2) { 
        color = 'purple'
      } else { 
        color = 'black';
      }
      div_element += `<div id = '${i}-${j}' style = 'border: 1px solid ${color}; height: 20px; width: 20px; display: in-line-block; background-color: ${color}></div>'`;
    }
    div_element += '<br>'; 
  }

  document.querySelector('#grid').appendChild(document.createElement(div_element));

}

document.addEventListener('keydown', (event) => {
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
});

function go_south() { 
  if(wait_until_snake_is_done_updating_to_update_direction === 'waiting') { 
    return go_south();
  }
  if(snake[0].direction === 's' || snake[0].direction === 'n') return;
  for(let i = 0; i < snakes.length; i++) { 
    snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction: 's'
    })
  } 
} 

function go_north() { 
  if(wait_until_snake_is_done_updating_to_update_direction === 'waiting') { 
    return go_north();
  }
  if(snake[0].direction === 's' || snake[0].direction === 'n') return;
  for(let i = 0; i < snakes.length; i++) { 
    snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction: 'n'
    })
  }
} 

function go_west() { 
  if(wait_until_snake_is_done_updating_to_update_direction === 'waiting') { 
    return go_west();
  }
  if(snake[0].direction === 'w' || snake[0].direction === 'e') return;
  for(let i = 0; i < snakes.length; i++) { 
    snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction: 'w'
    })
  }
} 

function go_east() { 
  if(wait_until_snake_is_done_updating_to_update_direction === 'waiting') { 
    return go_east();
  }
  if(snake[0].direction === 'e' || snake[0].direction === 'w') return;
  for(let i = 0; i < snakes.length; i++) { 
    snake[i].turns.push({
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction: 'e'
    })
  } 
} 

function move_snake() { 

  wait_until_snake_is_done_updating_to_update_direction = 'waiting';

  for(let i = 0; i < snake.length; i++) {

    if(
      typeof snake[i].turns[0] !== 'undefined' && 
      snake[i].x === snake[i].turns[0].turn_at_x_coordinate && 
      snake[i].y === snake[i].turns[0].turn_at_y_coordinate 
    ) { 
      snake[i].direction = snake[i].turns[0].direction_for_node_to_turn_in;
      snake[i].turns.unshift();
    }

    if(i === 0 && grid[snake[i].x][snake[i].y] === 2) { 
      grid[snake[i].x][snake[i].y] = 0;
      let last_node = snake[snake.length - 1];
      snake.push({ 
        x: last_node.direction === 'e' ? last_node.x -= 1 : last_node.direction === 'w' ? last_node.x += 1 : last_node.x, 
        y: last_node.direction === 'n' ? last_node.y -= 1 : last_node.direction === 's' ? last_node.y += 1 : last_node.y, 
        direction: last_node.direction, 
        type_: 'trailing_node', 
        turns: last_node.turns
      });
    }

    if(snake[i].direction === 'n') {
      snake[i].y += 1;
    } else if(snake[i].direction === 's') { 
      snake[i].y -= 1;
    } else if(snake[i].direction === 'e') { 
      snake[i].x += 1;
    } else if(snake[i].direction === 'w') { 
      snake[i].x -= 1;
    }

    if(i === 0 && typeof grid[snake[i].x][snake[i].y] === 'undefined') { 
      return { 
        error: true, 
        message: 'you ran into a wall'
      }
    }

  }

  wait_until_snake_is_done_updating_to_update_direction = 'finished';

  display_grid();

}

function display_grid() {

  let snake_node_count = 0;
  let breakout = false;
  for(let i = 0; i < grid.length; i++) { 
    if(breakout) { 
      break;
    }
    for(let j = 0; j < grid[i].length; j++) { 
      if(grid[i][j] === 1) { 
        grid[i][j] = 0; 
        snake_node_count += 1;
        if(snake_node_count === snake.length - 1) { 
          breakout = true; 
          break;
        }
      }
    }
  }

  for(let i = 0; i < snake.length; i++) { 
    grid[snake[i].x][snake[i].y] = 1
  }

  for(let i = 0; i < grid.length; i++) { 
    for(let j = 0; j < grid[i].length; j++) { 
      if(grid[i][j] === 0) {
        document.querySelector(`#${i}-${j}`).backgroundColor = 'black';
      } else if(grid[i][j] === 1) { 
        document.querySelector(`#${i}-${j}`).backgroundColor = 'red';
      } else { 
        document.querySelector(`#${i}-${j}`).backgroundColor = 'purple';
      }
    }
  }

  return setTimeout(function() { 
    move_snake()
  }, 3000)

}

setup_grid();
move_snake();

</script>
</html>
