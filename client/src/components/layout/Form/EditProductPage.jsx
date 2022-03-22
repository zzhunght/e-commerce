import React , {useState,useContext, useEffect} from 'react'
import { Redirect, useHistory ,useParams} from 'react-router-dom'
import { StallContext } from '../../../Context/Stall'
import './Style.css'


function EditProductPage() {
    const param = useParams()
    const id = param.id
    let history = useHistory()
    //global state and props
    const {EditStall,StallState:{item},GetCategory} = useContext(StallContext)

    if(!item) history.push('/my-stall/products')
    //local state
    const [categoriesList,setCategoriesList] = useState([
        {
            name:'',
            label:{
                en:"",
                vi:''
            }
        }
    ])
    const [formvalue,setFormValue] = useState({
        name:item?.name || '',
        description:item?.description || '',
        brand:item?.brand || '',
        category:item?.category._id || '',
        imageUrl:item?.imageUrl || '',    
        status:item?.status || 'available',
    })
    const [color,setColor] = useState(item?.color || [''])
    const [skus,setSkus] = useState(item?.skus || [
        {
            price: 0,
            size: ''
        }
    ])

    //function 
    //color feature
    const onColorChange =(e,i) => {
        const newcolor = [...color]
        newcolor[i] = e.target.value
        setColor(newcolor)
    }

    const onColorAdd = (e) =>{
        e.preventDefault()
        const newcolor = [...color,'']
        setColor(newcolor)
    }

    const onColorRemove = (e,i) =>{
        e.preventDefault()
        const newcolor = [...color]
        newcolor.splice(i, 1)
        setColor(newcolor)
    }
    //status
    const onStatusChange = (e) =>{
        setFormValue({
            ...formvalue,
            status: e.target.value
        })
    }
    //sku feature
    const onSkuChange =(e,i) => {
        const newskus = [...skus]
        newskus[i][e.target.name] = e.target.value

        setSkus(newskus)
    }

    const onSkuAdd = (e) =>{
        e.preventDefault()
        const newskus = [...skus,{
            size:'',
            price:0
        }]
        setSkus(newskus)
    }

    const onSkuRemove = (e,i) =>{
        e.preventDefault()
        const newskus = [...skus]
        newskus.splice(i, 1)
        setSkus(newskus)
    }

    /////##############################3
    const onFormChange = (e) => {
        const values = {...formvalue}
        values[e.target.name] = e.target.value
        
        setFormValue(values)
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        const newskus = skus.map(sku => {
            return {
                size:sku.size,
                price:Number(sku.price)
            }
        })

        const form = {
            ...formvalue,
            skus:[
                ...newskus
            ],
            color: [...color]
        }
        
        // console.log(form)
        const res = await EditStall(form,item._id)
        history.push('/my-stall/products')
        
    }

    //###########3
        //category
    const onCategoryChange = (e) => {
        setFormValue({
            ...formvalue,
            category:e.target.value
        })
    }
    
    // useEffect
    
    useEffect(() => {
        const Getcategory = async ()=>{
            const res = await GetCategory()
            setCategoriesList(res.category)
        }
        Getcategory()
    },[])
    return (
        <div className="stall-form-add-wr">
            <div className="form-wr">
                <h1 className="stall-form-title">
                    Thông Tin Sản Phẩm
                </h1>
                <form className="add-form" onSubmit={onFormSubmit} action="/my-stall/products">
                    <div className="form-group">
                        <label htmlFor="name">Tên Sản Phẩm </label>
                        <input
                         required={true}
                         type="text" 
                         name="name" 
                         id="name"
                         value={formvalue.name} 
                         onChange={(e)=>onFormChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Thương Hiệu</label>
                        <input
                         required={true}
                         type="text" 
                         name="brand" 
                         id="brand"
                         value={formvalue.brand} 
                         onChange={(e)=>onFormChange(e)}
                        />
                    </div>
                    <div className="form-group category select">
                        <label htmlFor="category">Danh Mục</label>
                        <select
                         id="category" 
                         className=" beautiful" 
                         onChange={e =>onCategoryChange(e)}
                         value={formvalue.category}
                        >
                            
                            {categoriesList.map((item,i) => (
                                <option
                                 value={item._id}
                                 key={i}
                                >
                                    {item.label.vi}
                                </option>
                            ))}
                        
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="imageUrl">ImageUrl</label>
                        <input
                         required={true}
                         type="text" 
                         name="imageUrl" 
                         id="imageUrl"
                         value={formvalue.imageUrl} 
                         onChange={(e)=>onFormChange(e)}
                        />
                    </div>
                    <div className="form-group select">
                        
                        <label htmlFor="status">Tình Trạng</label>
                        <select
                         id="status" 
                         className="beautiful" 
                         onChange={e =>onStatusChange(e)}
                         value={formvalue.status}
                        >
                            <option value="available">Có Sẵn </option>
                            <option value="unavailable">Hết Hàng</option>
                           
                        </select>

                    </div>
                    <div className="form-group textarea">
                        <label htmlFor="description">Mô tả</label>
                        <textarea 
                         required={true}
                         name="description" 
                         id="description"
                         value={formvalue.description} 
                         onChange={(e)=>onFormChange(e)}
                        />
                    </div>
                    <div className="form-color">
                        <p className="form-color-title">Màu Sắc</p>
                        {color.map((c,i)=>(
                            <div className="form-color-item" key={i}> 
                            <div className="form-group form-color-group">
                                <input
                                 required={true}
                                 type="text" 
                                 name="color" 
                                 id="color" 
                                 value={c} 
                                 onChange={(e)=>onColorChange(e,i)}
                                />
                            </div>
                            <button
                             className="form-color-remove"
                             onClick={e => onColorRemove(e,i)}
                            >
                                
                            </button>
                            </div>
                        ))}
                        <button
                         className="form-color-add"
                         onClick={(e)=>onColorAdd(e)}
                        >
                            Thêm Màu Sắc
                        </button>
                    </div>
                    <div className="form-skus">
                        <p className="form-sku-title">Phân Loại sản phẩm</p>
                        {skus.map((s,i)=>(
                            <div key={i} className="form-sku-item "> 
                            <div className="form-group form-sku-gruop">
                                <p className="form-sku-item-title">Size</p>
                                <input
                                 required={true}
                                 type="text" 
                                 name="size" 
                                 id="size" 
                                 value={s.size} 
                                 onChange={(e)=>onSkuChange(e,i)}
                                />
                            </div>
                            <div className="form-group form-sku-gruop">
                                <p className="form-sku-item-title">Giá </p>
                                <input
                                 required={true}
                                 type="text" 
                                 name="price" 
                                 id="price" 
                                 value={s.price} 
                                 onChange={(e)=>onSkuChange(e,i)}
                                />
                            </div>
                            <button
                             className="form-color-remove form-sku-remove"
                             onClick={e => onSkuRemove(e,i)}
                            >
                                
                            </button>
                            </div>
                        ))}
                        <button
                         className="form-color-add"
                         onClick={(e)=>onSkuAdd(e)}
                        >
                            Thêm Loại SP
                        </button>
                    </div>
                    
                    <button className="submit btn btn-submit" type="submit" >
                        Cập Nhật
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditProductPage
