import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import {
  fetchTodos,
  deleteTodoApi,
  addTodoAPI,
  updateTodoApi,
} from '../redux/actions/todoAction';

const TodoScreen = () => {
  const [title, setTitle] = useState('');
  const [mota, setMota] = useState('');
  const [ngay, setNgay] = useState('');
  const [tien, setTien] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editMota, setEditMota] = useState('');
  const [editNgay, setEditNgay] = useState('');
  const [editTien, setEditTien] = useState('');
  const [editChiThu, setEditChiThu] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isChiActive, setIsChiActive] = useState(false);
  const [isThuActive, setIsThuActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleChiPress = () => {
    setIsChiActive(true);
    setIsThuActive(false);
  };

  const handleThuPress = () => {
    setIsChiActive(false);
    setIsThuActive(true);
  };

  const listTodo = useSelector(state => state.listTodoStore.listTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDeleteTodo = async id => {
    dispatch(deleteTodoApi(id))
      .then(() => {
        console.log('Todo deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const handleAddTodo = () => {
    const duLieuThem = {
      tieude: title,
      mota: mota,
      ngay: ngay,
      tien: tien,
      loaithuchi: isChiActive,
    };
    dispatch(addTodoAPI(duLieuThem))
      .then(() => {
        console.log('Todo added successfully!');
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  const handleEdit = (id, tieude, mota, ngay, tien, loaithuchi) => {
    setEditTitle(tieude);
    setEditMota(mota);
    setEditNgay(ngay);
    setEditTien(tien);
    setEditChiThu(loaithuchi);
    setIdEdit(id);
  };

  const handleUpdate = () => {
    const duLieuUpdate = {
      tieude: editTitle,
      mota: editMota,
      ngay: editNgay,
      tien: editTien,
      loaithuchi: editChiThu,
    };
    dispatch(updateTodoApi({id: idEdit, data: duLieuUpdate}))
      .then(() => {
        console.log('Todo updated successfully!');
        setEditTitle('');
        setEditMota('');
        setEditNgay('');
        setEditTien('');
        setEditChiThu(false);
        setIdEdit(null);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  const filteredTodos = listTodo.filter(item =>
    item.tieude.toLowerCase().includes(searchKeyword.toLowerCase()),
  );
  const {totalChi, totalThu} = useMemo(() => {
    const totalChi = listTodo
      .filter(item => item.loaithuchi)
      .reduce((total, item) => total + parseFloat(item.tien), 0);

    const totalThu = listTodo
      .filter(item => !item.loaithuchi)
      .reduce((total, item) => total + parseFloat(item.tien), 0);

    return {totalChi, totalThu};
  }, [listTodo]);

  const renderItem = ({item}) => (
    <View
      style={{
        margin: 10,
        padding: 10,
        borderColor: 'blue',
        borderWidth: 1,
      }}>
      {idEdit === item.id ? (
        <>
          <TextInput value={editTitle} onChangeText={setEditTitle} autoFocus />
          <TextInput value={editMota} onChangeText={setEditMota} />
          <TextInput value={editNgay} onChangeText={setEditNgay} />
          <TextInput value={editTien} onChangeText={setEditTien} />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setEditChiThu(true);
              }}
              style={{
                backgroundColor: editChiThu ? 'orange' : 'gray',
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={{color: 'white'}}>chi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditChiThu(false);
              }}
              style={{
                backgroundColor: !editChiThu ? 'orange' : 'gray',
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={{color: 'white'}}>thu</Text>
            </TouchableOpacity>
          </View>
          <Button title="Update" onPress={handleUpdate} />
        </>
      ) : (
        <>
          <Text>{item.tieude}</Text>
          <Text>{item.mota}</Text>
          <Text>{item.ngay}</Text>
          <Text>
            {item.loaithuchi ? (
              <Text style={{color: 'red'}}>chi</Text>
            ) : (
              <Text style={{color: 'green'}}>thu</Text>
            )}
            : {item.tien}
          </Text>
          <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
            <Text style={{color: 'red'}}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleEdit(
                item.id,
                item.tieude,
                item.mota,
                item.ngay,
                item.tien,
                item.loaithuchi,
              )
            }>
            <Text>Edit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View>
      <TextInput
        placeholder="Tìm kiếm theo mô tả"
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        style={{borderWidth:1,borderRadius:10,width:'85%',alignSelf:'center',marginTop:'2%'}}
      />
      <TextInput
        placeholder="Nhập tiêu đề"
        onChangeText={setTitle}
        value={title}
        style={{borderWidth:1,borderRadius:10,width:'85%',alignSelf:'center',marginTop:'2%'}}
      />
      <TextInput style={{borderWidth:1,borderRadius:10,width:'85%',alignSelf:'center',marginTop:'2%'}} placeholder="Nhập mô tả" onChangeText={setMota} value={mota} />
      <TextInput style={{borderWidth:1,borderRadius:10,width:'85%',alignSelf:'center',marginTop:'2%'}} placeholder="Nhập ngày" onChangeText={setNgay} value={ngay} />
      <TextInput style={{borderWidth:1,borderRadius:10,width:'85%',alignSelf:'center',marginTop:'2%'}} placeholder="Nhập tiền" onChangeText={setTien} value={tien} />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={handleChiPress}
          style={{
            backgroundColor: isChiActive ? 'orange' : 'gray',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white'}}>chi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleThuPress}
          style={{
            backgroundColor: isThuActive ? 'orange' : 'gray',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white'}}>thu</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: 300, marginLeft: 50}}>
        <Button title="Thêm thu chi" onPress={handleAddTodo} />
      </View>

      <Text style={{fontSize: 18, marginTop: 20}}>Tổng chi:{totalChi}</Text>
      <Text style={{fontSize: 18, marginTop: 20}}>Tổng thu:{totalThu} </Text>

      <FlatList
        data={filteredTodos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default TodoScreen;
