/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';

import CreateSecretButton from '../../CreateSecretButton';
import { convertObjectToArray } from '../../../../../../services/helper-function';

import File from './file';
import Folder from './folder';
import AddFolderModal from '../../AddFolderModal';
import CreateSecretModal from '../../CreateSecretsModal';
import BackdropLoader from '../../../../../../components/Loaders/BackdropLoader';

const SecretsError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const TreeRecursive = (props) => {
  const {
    data,
    saveSecretsToFolder,
    saveFolder,
    handleCancelClick,
    setCreateSecretBox,
    setIsAddInput,
    isAddInput,
    setInputType,
    inputType,
    status,
    setStatus,
    getChildrenData,
    onDeleteTreeItem,
    secretprefilledData,
    setSecretprefilledData,
    userHavePermission,
  } = props;
  const [currentNode, setCurrentNode] = useState('');
  // loop through the data

  let arr = [];
  // eslint-disable-next-line consistent-return
  return data.map((item) => {
    if (
      item?.children[0]?.type.toLowerCase() === 'secret' &&
      item?.children[0]?.value
    ) {
      arr = convertObjectToArray(JSON.parse(item?.children[0]?.value));
    }

    // if its a file render <File />
    if (item.type.toLowerCase() === 'secret') {
      const secretArray =
        item.value && convertObjectToArray(JSON.parse(item.value));
      return secretArray.map((secret, index) => (
        <File
          key={index}
          secret={secret}
          parentId={item.parentId}
          setSecretprefilledData={setSecretprefilledData}
          type={item.type}
          setIsAddInput={setIsAddInput}
          setInputType={setInputType}
          onDeleteTreeItem={onDeleteTreeItem}
          id={item.id}
          userHavePermission={userHavePermission}
        />
      ));
    }
    // if its a folder render <Folder />
    if (item.type === 'folder') {
      return (
        <Folder
          folderInfo={item}
          setInputType={setInputType}
          setIsAddInput={setIsAddInput}
          getChildNodes={getChildrenData}
          setCurrentNode={setCurrentNode}
          onDeleteTreeItem={onDeleteTreeItem}
          id={item.id}
          key={item.id}
          userHavePermission={userHavePermission}
        >
          {status.status === 'loading' && <BackdropLoader color="secondary" />}

          {inputType?.type?.toLowerCase() === 'folder' &&
            inputType?.currentNode === item.value && (
              <AddFolderModal
                openModal={isAddInput}
                setOpenModal={setIsAddInput}
                childrens={item?.children.length ? item.children : data}
                parentId={item.id}
                handleCancelClick={handleCancelClick}
                handleSaveClick={(secret) => saveFolder(secret, item.value)}
              />
            )}
          {inputType?.type?.toLowerCase() === 'secret' &&
            inputType?.currentNode === item.value && (
              <CreateSecretModal
                openModal={isAddInput}
                secretprefilledData={secretprefilledData}
                setOpenModal={setIsAddInput}
                parentId={item.id}
                handleSecretCancel={handleCancelClick}
                handleSecretSave={(secret) => saveFolder(secret, item.value)}
              />
            )}
          {Array.isArray(item.children) ? (
            <TreeRecursive
              data={item.children}
              saveSecretsToFolder={saveSecretsToFolder}
              setCreateSecretBox={setCreateSecretBox}
              handleCancelClick={handleCancelClick}
              saveFolder={saveFolder}
              isAddInput={isAddInput}
              setIsAddInput={setIsAddInput}
              setInputType={setInputType}
              inputType={inputType}
              path={`${item.id}/${item.value}`}
              setStatus={setStatus}
              status={status}
              getChildrenData={getChildrenData}
              onDeleteTreeItem={onDeleteTreeItem}
              secretprefilledData={secretprefilledData}
              setSecretprefilledData={setSecretprefilledData}
              userHavePermission={userHavePermission}
            />
          ) : (
            <></>
          )}
          {currentNode === item.value && status.status === 'failed' && (
            <SecretsError>Error in loading secrets!</SecretsError>
          )}

          {[...item?.children, ...arr].length <= 1 &&
            currentNode === item.id && (
              <CreateSecretButton
                onClick={(e) => setCreateSecretBox(e, item.value)}
              />
            )}
        </Folder>
      );
    }
  });
};

export default TreeRecursive;
