'use client';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import api from '@/utilities/api';
import { Box, Button, Modal, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useVotingUrl } from '@/utilities/useVoting';
import { useDebounce } from 'usehooks-ts';
import { useQuestions } from '@/utilities/useQuestion';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LoadingSkeleton: FC = () => {
  return (
    <div className="space-y-2 p-4 w-[800px]">
      <Skeleton variant="rounded" height={60} />
      <hr />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rounded" width={80} height={40} />
      <hr />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rounded" height={40} />
    </div>
  )
}

const AddQuestion: FC<{ onAddQuestion: Function }> = (props) => {
  function onChangeSetValue(setter: Function): ChangeEventHandler<HTMLInputElement> {
    return (e) => setter(e.target.value)
  }

  const [showError, setShowError] = useState(false);
  const [questionLabel, setQuestionLabel] = useState("");
  const [leftLabel, setLeftLabel] = useState("");
  const [rightLabel, setRightLabel] = useState("");

  const onSubmit: FormEventHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const q = { 
      questionLabel: questionLabel.trim(), 
      leftLabel: leftLabel.trim(), 
      rightLabel: rightLabel.trim() 
    };

    if (
      q.questionLabel.length === 0 ||
      q.leftLabel.length === 0 ||
      q.rightLabel.length === 0
    ) {
      setShowError(true);
      return;
    }

    const res = await api.addQuestion(q);

    if (res.success === true) {
      // window.location.reload()
      props.onAddQuestion();
      clearInputLabel();
    }

    setShowError(false);
  }

  function clearInputLabel() {
    setQuestionLabel("")
    setLeftLabel("")
    setRightLabel("")
  }

  return (
    <Box
      component="form"          
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <div className="flex space-y-4 flex-col">
        <div>
          <TextField
            id="questionLabel"
            value={questionLabel}
            error={showError && questionLabel.length === 0}
            label="題目"
            fullWidth
            onChange={onChangeSetValue(setQuestionLabel)}
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <TextField
              id="leftLabel"
              value={leftLabel}
              error={showError && leftLabel.length === 0}
              label="正方"
              fullWidth
              onChange={onChangeSetValue(setLeftLabel)}
            />
          </div>
          <div className="flex-1"> 
            <TextField
              id="rightLabel"
              value={rightLabel}
              error={showError && rightLabel.length === 0}
              label="反方"
              fullWidth
              onChange={onChangeSetValue(setRightLabel)}
            />
          </div>
        </div>
        <div>
          <Button variant='contained' color="success" type="submit">新增</Button>
        </div>
      </div>
    </Box>
  )
}

const AdminPage: FC = () => {
  const [{ questions, activeQuestionIndex }, { mutate: reloadList, isLoading }] = useQuestions();
  const [ votingUrl, votingContext ] = useVotingUrl()
  const debouncedIsLoading = useDebounce(isLoading, 1000);
  const [openModal, setOpenModal] = useState(false);

  async function removeQuestion(qIndex: number) {
    const res = await api.removeQuestion(qIndex)()

    if (res.success === true) {
      reloadList();
    }
  }

  async function setActiveQuestion(qIndex: number) {
    const res = await api.setActiveQuestion(qIndex)()
    
    if (res.success === true) {
      reloadList();
    }
  }

  async function removeActiveQuestion(qIndex: number) {
    const res = await api.InactiveQuestion(qIndex)

    if (res.success === true) {
      reloadList();
    }
  }
  
  return (
    <div className="w-screen h-screen flex justify-center p-8">
      {debouncedIsLoading ? (<LoadingSkeleton />) : (
        <div className="max-w-[800px] w-screen">  
          <div className="p-4 space-y-4">
            <div className="flex justify-between">
              <div className="space-x-4">
                <Button variant="contained" color="secondary" href="/active" target="_blank">跳到展示頁面</Button>
                <Button variant="contained" color="secondary" href={votingUrl} target="_blank">打開投注頁面</Button>
              </div>
              <div>
              <Button variant="contained" color="error" onClick={() => votingContext.refresh()} >刷新 Voting token key</Button>
              </div>
            </div>
            <hr />
            <div>
              <AddQuestion onAddQuestion={reloadList}></AddQuestion>
            </div>
            
          </div>
          {/* Questions List */}
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">#</TableCell>
                    <TableCell>題目</TableCell>
                    <TableCell align="right">正方</TableCell>
                    <TableCell align="right">反方</TableCell>
                    {activeQuestionIndex === null && <TableCell align="right"></TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions?.map((row, index) => (
                    <>
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" align="left" rowSpan={row.votes.length + 1}>
                          <div className="space-x-4">
                            {activeQuestionIndex === null ? (<Button variant='contained' onClick={() => setActiveQuestion(index)}>開始</Button>) : null}
                            {activeQuestionIndex === index ? (<Button variant='contained' color="warning" onClick={() => removeActiveQuestion(index)}>結束</Button>) : null}
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row" rowSpan={row.votes.length + 1}> {index + 1} </TableCell>
                        <TableCell component="th" scope="row" rowSpan={row.votes.length + 1}> {row.questionLabel} </TableCell>
                        <TableCell align="right" className="bg-blue-800">{row.leftLabel}</TableCell>
                        <TableCell align="right" className="bg-red-800">{row.rightLabel}</TableCell>
                        
                          {activeQuestionIndex === null && (
                            <TableCell align="right" rowSpan={row.votes.length + 1}>
                              <div className="space-x-4">
                                <Button variant='contained' color="error" onClick={() => setOpenModal(true)}>刪除</Button>
                                <Modal
                                  open={openModal}
                                  onClose={() => setOpenModal(false)}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style} className="space-y-4">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                      確定要刪除 `{row.questionLabel}` 嗎？
                                    </Typography>
                                    <Button variant='contained' color="error" onClick={() => removeQuestion(index)}>確定刪除</Button>
                                  </Box>
                                </Modal>
                              </div>
                            </TableCell>
                          )}
                      </TableRow>
                      {row.votes.map(([leftVotes, rightVotes], voteIndex) => {
                        return (
                          <TableRow
                            key={voteIndex}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            {/* <TableCell component="th" align="right"></TableCell> */}
                            <TableCell align="right">{leftVotes}</TableCell>
                            <TableCell align="right">{rightVotes}</TableCell>
                          </TableRow>
                        )
                      })}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage;