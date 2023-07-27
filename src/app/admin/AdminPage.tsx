'use client';
import useSWR, { mutate } from 'swr'
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import api from '@/utilities/api';
import { Box, Button, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

const LoadingSkeleton: FC = () => {
  return (
    <div className="space-y-2 p-4">
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
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
              label="左邊標題"
              fullWidth
              onChange={onChangeSetValue(setLeftLabel)}
            />
          </div>
          <div className="flex-1"> 
            <TextField
              id="rightLabel"
              value={rightLabel}
              error={showError && rightLabel.length === 0}
              label="右邊標題"
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
  const key = "/api/questions";
  const { data, error, isLoading } = useSWR(key, api.fetchQuestions());

  function reloadList() {
    mutate(key);
  }

  async function removeQuestion(index: number) {
    const res = await api.removeQuestion(index)()

    if (res.success === true) {
      reloadList();
    }
  }

  async function setActiveQuestion(index: number) {
    const res = await api.setActiveQuestion(index)
    
    if (res.success === true) {
      reloadList();
    }
  }

  async function removeActiveQuestion() {
    const res = await api.removeActiveQuestion()

    if (res.success === true) {
      reloadList();
    }
  }
  
  return (
    <div className="w-screen h-screen flex justify-center p-8">
      {isLoading ? (<LoadingSkeleton />) : (
        <div className="max-w-screen">  
          <div className="p-4 space-y-4">
            <div >
              <Button variant="contained" color="secondary" href="/active" target="_blank">跳到展示頁面</Button>
            </div>
            <hr />
            <div className="w-[500px]">
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
                    <TableCell align="right">左標題</TableCell>
                    <TableCell align="right">票數(左)</TableCell>
                    <TableCell align="right">右標題</TableCell>
                    <TableCell align="right">票數(右)</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data.questions.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">
                        <div className="space-x-4">
                          {data?.data.activeIndex === null ? (<Button variant='contained' onClick={() => setActiveQuestion(index)}>開始</Button>) : null}
                          {data?.data.activeIndex === index ? (<Button variant='contained' color="warning" onClick={() => removeActiveQuestion()}>結束</Button>) : null}
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row"> {index + 1} </TableCell>
                      <TableCell component="th" scope="row"> {row.questionLabel} </TableCell>
                      <TableCell align="right">{row.leftLabel}</TableCell>
                      <TableCell align="right">{row.leftVotes}</TableCell>
                      <TableCell align="right">{row.rightLabel}</TableCell>
                      <TableCell align="right">{row.rightVotes}</TableCell>
                      <TableCell align="right">
                        <div className="space-x-4">
                          <Button variant='contained' color="error" onClick={() => removeQuestion(index)}>刪除</Button>
                        </div>
                      </TableCell>
                    </TableRow>
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