import React, { useContext, useEffect } from 'react';
import { Input, message } from 'antd';
import { GlobalContext } from '@views/context';
import { useDispatch, useSelector } from 'react-redux';
import { UIPreferenceReducer } from '@/store/settings';

export function UIDBar() {
  const { gTargetUID, setGTargetUID } = useContext(GlobalContext);
  const dispatch = useDispatch();

  // // 发送指令
  // const sendCMD = () => {
  //   if (!window.GCManageClient.isConnected()) {
  //     message.error('服务器未连接，无法发送');
  //     return;
  //   }
  //   window.GCManageClient.sendCMD(`target ${userId}`);
  //   message.success('设置完成');
  //   setGTargetUID('');
  // };
  //
  // const handleKeyUp = (e) => {
  //   if (e.code === 'Enter' || e.keyCode === 13) {
  //     sendCMD();
  //   }
  // };

  return <div className="gwt-header-uid-bar">
    <Input
      value={gTargetUID}
      onChange={(e) => {
        setGTargetUID(e.target.value);
        dispatch(UIPreferenceReducer.actions.update({
          globalTargetUid: e.target.value,
        }));
      }}
      // onKeyUp={handleKeyUp}
      prefix="全局目标: @"
      placeholder="UID"
    />
  </div>;
}
