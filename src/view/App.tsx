import { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet, asyncPost, asyncPut, asyncDelete } from '../utils/fetch';
import { api } from '../enum/api';
import { Student } from '../interface/Student';
import { resp } from '../interface/resp';

function App() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [absenceThreshold, setAbsenceThreshold] = useState<string>('');
  const [filteredStudents, setFilteredStudents] = useState<Array<Student> | null>(null);
  const [departmentStats, setDepartmentStats] = useState<Record<string, number>>({});

  const cache = useRef<boolean>(false);

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code === 200) {
          const studentsWithAbsences = res.body.map((student) => ({
            ...student,
            absences: Math.floor(Math.random() * 6), // 生成 0-5 的隨機數
          }));
          setStudents(studentsWithAbsences);
        }
      });
    }
  }, []);

  const analyzeDepartments = () => {
    const stats: Record<string, number> = {};
    students.forEach((student) => {
      stats[student.department] = (stats[student.department] || 0) + 1;
    });
    setDepartmentStats(stats);
    setFilteredStudents(null);
  };

  const filterByAbsences = () => {
    const threshold = parseInt(absenceThreshold, 10);
    if (!isNaN(threshold)) {
      const filtered = students.filter((student) => (student.absences || 0) === threshold);
      setFilteredStudents(filtered);
    } else {
      alert('請輸入有效的數字');
    }
  };

  const searchByName = () => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  /**
   * 刪除學生資料（根據 ID）
   */
  const deleteStudentById = async () => {
    const id = prompt('請輸入要刪除的學生 ID：');
    if (!id) return;

    const studentExists = students.some((student) => student._id === id);
    if (!studentExists) {
      alert('未找到對應的學生資料，請檢查 ID 是否正確！');
      return;
    }

    try {
        const resp = await asyncDelete(`${api.deleteById}/${id}`); // 修改為正確的 API 路徑

        if (resp.code === 200) {
            const updatedStudents = students.filter((student) => student._id !== id);
            setStudents(updatedStudents); // 更新學生列表
            setFilteredStudents(null); // 清空過濾條件
            alert(`ID 為 ${id} 的學生資料已刪除！`);
        } else {
            alert('刪除失敗，請稍後再試！');
        }
    } catch (error) {
        console.error('刪除學生資料錯誤:', error);
        alert('刪除過程中發生錯誤，請稍後再試！');
    }
};


  const addStudent = async () => {
    const userName = prompt('請輸入學生帳號：');
    const sid = prompt('請輸入學生座號：');
    const name = prompt('請輸入學生姓名：');
    const department = prompt('請輸入學生院系：');
    const Email = prompt('請輸入學生 Email：');
    const grade = prompt('請輸入學生年級：');
    const studentClass = prompt('請輸入學生班級：');

    if (!userName || !sid || !name || !department || !Email || !grade || !studentClass) {
      alert('所有欄位均為必填，請完整輸入資料！');
      return;
    }

    const newStudent: Student = {
      _id: Math.random().toString(36).substr(2, 9),
      userName,
      sid,
      name,
      department,
      Email,
      grade,
      class: studentClass,
      absences: Math.floor(Math.random() * 6),
    };

    const resp = await asyncPost(api.insertOne, newStudent);
    if (resp.code === 200) {
      setStudents((prevStudents) => [...prevStudents, newStudent]);
      setFilteredStudents(null);
      alert(`學生 ${name} 的資料已成功新增！`);
    } else {
      alert('新增失敗，請稍後再試！');
    }
  };

  const editStudent = async () => {
    const sid = prompt('請輸入要修改的學生座號：');
    if (!sid) return;

    const studentIndex = students.findIndex((student) => student.sid === sid);
    if (studentIndex === -1) {
      alert('未找到對應的學生資料，請檢查座號是否正確！');
      return;
    }

    const userName = prompt('請輸入新的學生帳號：', students[studentIndex].userName);
    const name = prompt('請輸入新的學生姓名：', students[studentIndex].name);
    const department = prompt('請輸入新的學生院系：', students[studentIndex].department);
    const Email = prompt('請輸入新的學生 Email：', students[studentIndex].Email);
    const grade = prompt('請輸入新的學生年級：', students[studentIndex].grade);
    const studentClass = prompt('請輸入新的學生班級：', students[studentIndex].class);

    if (!userName || !name || !department || !Email || !grade || !studentClass) {
        alert('所有欄位均為必填，請完整輸入資料！');
        return;
    }

    const updatedStudent: Student = {
        ...students[studentIndex],
        userName,
        name,
        department,
        Email,
        grade,
        class: studentClass,
        absences: Math.floor(Math.random() * 6), // 保留隨機生成的缺席數量
    };

    try {
        const resp = await asyncPut(`${api.updateNameByID}/${students[studentIndex]._id}`, updatedStudent); // 發送 PUT 請求

        if (resp.code === 200) {
            const updatedStudents = [...students];
            updatedStudents[studentIndex] = updatedStudent;
            setStudents(updatedStudents); // 更新學生資料
            setFilteredStudents(null); // 清空過濾條件
            alert(`座號為 ${sid} 的學生資料已成功更新！`);
        } else {
            alert('更新失敗，請稍後再試！');
        }
    } catch (error) {
        console.error('更新學生資料錯誤:', error);
        alert('更新過程中發生錯誤，請稍後再試！');
    }
};


  const displayStudents = filteredStudents || students;

  const studentList = displayStudents.map((student: Student) => (
    <div className="student" key={student._id}>
      <p>ID: {student._id}</p>
      <p>帳號: {student.userName}</p>
      <p>座號: {student.sid}</p>
      <p>姓名: {student.name}</p>
      <p>院系: {student.department}</p>
      <p>年級: {student.grade}</p>
      <p>班級: {student.class}</p>
      <p>Email: {student.Email}</p>
      <p>缺席次數: {student.absences ? student.absences : 0}</p>
    </div>
  ));

  return (
    <>
      <div className="controls">
        <button onClick={analyzeDepartments}>分析各系人數</button>

        <input
          type="text"
          placeholder="輸入缺席次數查詢"
          value={absenceThreshold}
          onChange={(e) => setAbsenceThreshold(e.target.value)}
        />
        <button onClick={filterByAbsences}>查詢缺席次數</button>

        <input
          type="text"
          placeholder="輸入姓名搜尋"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchByName}>搜尋姓名</button>

        <button onClick={deleteStudentById} style={{ background: 'red', color: 'white' }}>
          刪除資料
        </button>

        <button onClick={addStudent} style={{ background: 'green', color: 'white' }}>
          新增資料
        </button>

        <button onClick={editStudent} style={{ background: 'blue', color: 'white' }}>
          修改資料
        </button>
      </div>

      {Object.keys(departmentStats).length > 0 && (
        <div className="department-stats">
          <h3>各系人數分析</h3>
          <ul>
            {Object.entries(departmentStats).map(([department, count]) => (
              <li key={department}>
                {department}: {count} 人
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="container">{studentList}</div>
    </>
  );
}

export default App;
