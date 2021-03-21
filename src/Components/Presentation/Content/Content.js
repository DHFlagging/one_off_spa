import React, {useEffect, useState} from "react";
import {Layout, Alert, Input, Button, message, Tooltip} from "antd";
import "react-html5-camera-photo/build/css/index.css";
import "antd/dist/antd.css";
import {Dispatchapi, getBackendAzureADUserProfileId} from "../../../Utils/api";
import {DownOutlined, FontColorsOutlined, HighlightTwoTone, UpOutlined} from "@ant-design/icons";
import consoleLog from "../../../Utils/logging";
import './Style.css'
export default function Content(props) {
    const [memes,setMemes] = useState([])
    const [azureId,setAzureId] = useState(null)
    const [unsavedChanges,setUnsavedChanges] = useState(false)
    const getMemes = async () => {
        const azureId = await getBackendAzureADUserProfileId()
        setAzureId(azureId)
        Dispatchapi.get('/duelingmemes').then(response => setMemes(response.data.dueling_memes.map(meme =>
        {
            if(meme.creators.find(user => user.access_token === azureId))
            {
                return meme
            }else
            {
                return {...meme,creators:[...meme.creators,{access_token:azureId,username:"",pivot:{duelingmeme_id:meme.id,message:'Just click here and start typing',pixels:20,top:-60,color:'#000000',user_id:null}}]}
            }
        })))
    }

    const saveEntry = (meme_entry) => {
        message.loading({duration:0,content:'Saving Entry',key:meme_entry.duelingmeme_id})
        Dispatchapi.put('meme-submission/'+meme_entry.duelingmeme_id,meme_entry).then(async response => {
            await getMemes()
            message.destroy(meme_entry.duelingmeme_id)
            message.success('Saved Entry')
            setUnsavedChanges(false)
        }).catch(reason => consoleLog(reason,'error'))
    }
    const updateColor = (color) => {
        setUnsavedChanges(true)
        setMemes(memes.map(meme => {
            return {...meme,creators:meme.creators.map(user => {
                    if(user.access_token === azureId)
                    {
                        return {...user,pivot:{...user.pivot,color}}
                    }
                    return user
                })}
        }))
    }
    const updatePixels = (pixels) => {
        setUnsavedChanges(true)
        setMemes(memes.map(meme => {
            return {...meme,creators:meme.creators.map(user => {
                    if(user.access_token === azureId)
                    {
                        return {...user,pivot:{...user.pivot,pixels:user.pivot.pixels + pixels}}
                    }
                    return user
                })}
        }))
    }
    const updateTop = (top) => {
        setUnsavedChanges(true)
        setMemes(memes.map(meme => {
            return {...meme,creators:meme.creators.map(user => {
                    if(user.access_token === azureId)
                    {
                        return {...user,pivot:{...user.pivot,top:user.pivot.top + top}}
                    }
                    return user
                })}
        }))
    }
    const updateMessage = (message) => {
        setUnsavedChanges(true)
        setMemes(memes.map(meme => {
            return {...meme,creators:meme.creators.map(user => {
                    if(user.access_token === azureId)
                    {
                        return {...user,pivot:{...user.pivot,message}}
                    }
                    return user
                })}
        }))
    }
    useEffect(() => {
        getMemes()
    },[])
  return (
    <Layout.Content>
        <Alert description={<div style={{textAlign:'center'}}>Add your witty quip below and get a free coffee</div>} message={<div style={{textAlign:'center'}}>The Dueling Memes!!!</div>} type="info" />
        {memes.map(meme => {
            var img = document.createElement("img")
            img.setAttribute("src", meme.image)
            return (
                <div style={{maxWidth:img.width,position:'relative'}}>
                    <img src={meme.image}/>
                    <div style={{position:'absolute',left:'10px',bottom:meme.creators.find(creator => creator.access_token === azureId).pivot.top}}>
                            <div style={{display:'flex', justifyContent: 'center'}}>
                                <div style={{display:'block'}}>
                                    <Button style={{display:'block'}} onClick={() => updateTop(5)} type='primary' icon={<UpOutlined />}/>
                                    <Button style={{display:'block'}} onClick={() => updateTop(-5)} type='primary' icon={<DownOutlined />}/>
                                </div>
                                <Input.TextArea value={meme.creators.find(creator => creator.access_token === azureId).pivot.message} onChange={(e) => setUnsavedChanges(true) || updateMessage(e.target.value)} style={{color:meme.creators.find(creator => creator.access_token === azureId).pivot.color,fontSize:meme.creators.find(creator => creator.access_token === azureId).pivot.pixels+'px',background:'transparent',border:'0px',width:img.width - 100}}/>
                                <div style={{display:'block'}}>
                                    <Button style={{display:'block'}} onClick={() => updatePixels(5)} type='primary' icon={<FontColorsOutlined style={{fontSize:'24px'}} />}/>
                                    <Button style={{display:'block'}} onClick={() => updatePixels(-5)} type='primary' icon={<FontColorsOutlined style={{fontSize:'12px'}}/>}/>
                                </div>
                            </div>
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <Button onClick={() => updateColor('#000000')} type={meme.creators.find(creator => creator.access_token === azureId).pivot.color === '#000000' && 'primary'} icon={<HighlightTwoTone  twoToneColor="#000000"/>}/>
                                <Button onClick={() => updateColor('#ff8800')} type={meme.creators.find(creator => creator.access_token === azureId).pivot.color === '#ff8800' && 'primary'} icon={<HighlightTwoTone  twoToneColor="#ff8800"/>}/>
                                <Button onClick={() => updateColor('#ffffff')} type={meme.creators.find(creator => creator.access_token === azureId).pivot.color === '#ffffff' && 'primary'} icon={<HighlightTwoTone  twoToneColor="#ffffff"/>}/>
                                <Button onClick={() => updateColor('#14b80f')} type={meme.creators.find(creator => creator.access_token === azureId).pivot.color === '#14b80f' && 'primary'} icon={<HighlightTwoTone  twoToneColor="#14b80f"/>}/>
                                <Button onClick={() => updateColor('#0011ff')} type={meme.creators.find(creator => creator.access_token === azureId).pivot.color === '#0011ff' && 'primary'} icon={<HighlightTwoTone  twoToneColor="#0011ff"/>}/>
                                <Button onClick={() => updateColor('#ff0000')} type={meme.creators.find(creator => creator.access_token === azureId).pivot.color === '#ff0000' && 'primary'} icon={<HighlightTwoTone  twoToneColor="#ff0000"/>}/>
                            </div><Tooltip title={unsavedChanges && "Save your changes"}><Button className={unsavedChanges && 'glowing-button'} type='primary' onClick={() => saveEntry(meme.creators.find(creator => creator.access_token === azureId).pivot)}>Submit</Button></Tooltip>
                    </div>
                </div>
            )
        })}
    </Layout.Content>
  );
}


