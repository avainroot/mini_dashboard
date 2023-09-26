import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'styles/common.scss';
// import { ReactComponent as Close } from 'images/close.svg';
import { IItems, itemsDefault, operators } from 'data';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function App() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [mounted, setMounted] = useState<boolean>(false);
  const [items, setItems] = useState<IItems[]>(itemsDefault);
  const [newCounter, setNewCounter] = useState<number>(1);

  // const onDelete = (i: number) => {   
  //   setItems(_.reject(items, (item, index) => { 
  //     return i === index 
  //   }))
  // }

  useEffect(()=>{
    const dashboard = localStorage.getItem('dashboard');
    if(dashboard) {
      setItems(JSON.parse(dashboard).layout);
      setNewCounter(JSON.parse(dashboard).counter);
    }
    setMounted(true)
  }, [])

  useEffect(()=>{
    mounted && localStorage.setItem('dashboard', JSON.stringify({
      layout: items,
      counter: newCounter
    }))
  }, [items, mounted, newCounter])

  const onAdd = () => {   
    setItems(items.concat([
      {
        i: `Other ${newCounter}`,
        x: 0, 
        y: 0, 
        w: 1, 
        h: 1,
        minW: 3
      }
    ]))
    setNewCounter(newCounter + 1);
  }

  const onChange = (layout: IItems[]) => {   
    setItems(layout)
  }

  return (
    <div className="App">
      <h1>📊 Mini Dashboard</h1>
      <ResponsiveGridLayout
        className="layout"
        rowHeight={83}
        breakpoints={{ sm: 700, xs: 560, xxs: 0 }}
        cols={{ sm: 8, xs: 6, xxs: 3 }}
        resizeHandles={['s','n','w','e']}
        margin={[6,6]}
        useCSSTransforms={false}
        onDragStop={onChange}
        onResizeStop={onChange}
        measureBeforeMount={true}
        draggableCancel=".react-grid-item-delete"
      >
        {items.map((item, key)=>{
          return item.i === 'add' ? (
                <div key={item.i} onClick={()=>onAdd()} className='react-grid-item-add' data-grid={{...item}}><span>+</span></div>
              ) : (
                <div key={item.i} data-grid={{...item}}>
                  <div className='react-grid-item_main'>
                    <div className='react-grid-item_top'>
                      <div className='react-grid-item_title'>
                        Ваша смена
                      </div>
                      {item.h === 1 && (
                        <div className='react-grid-item_top-info'>
                          Операторов на смене:
                          <div className='react-grid-item_amount'>4</div>
                        </div>
                      )}
                    </div>
                    <div className='react-grid-item_pane'>
                      <div className='react-grid-item_timer'>
                        00:19:54
                      </div>
                      <div className='react-grid-item_timer-action'>
                        <div className='react-grid-item_btn'>
                          Пауза
                          <PauseCircleFilledIcon />
                        </div>
                        <div className='react-grid-item_btn'>
                          Завершить
                          <StopCircleIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.h>1 && (
                    <div className='react-grid-item_more'>
                      <div className='react-grid-item_top-info'>Операторов на смене:</div>
                      <div className='react-grid-item_operators'>
                        {operators.map(({active}:any, i)=>{
                          return (
                            <div key={i} className={`react-grid-item_operators-item ${!active && 'disable'}`}>
                              <div>
                                <img src={`${process.env.PUBLIC_URL}/ops/${i+1}.jpg`} alt='' />
                              </div>
                              <span>
                                <AccountCircleIcon />
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {/* <span className='react-grid-item-delete' onClick={()=>onDelete(key)}>
                    <Close />
                  </span> */}
                </div>
              )
        })}
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
