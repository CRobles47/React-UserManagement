package com.user.table.usermanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.user.table.usermanagement.entity.User;
import com.user.table.usermanagement.exception.UserNotFoundException;
import com.user.table.usermanagement.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public List<User> getAll(){
		return userRepository.findAll();
	}
	
	public ResponseEntity<?> getUser(Integer id){
		Optional<User> user = userRepository.findById(id);
		return user.map(response -> ResponseEntity.ok().body(response))
					.orElseThrow(() -> new UserNotFoundException());
	}
	
	public ResponseEntity<?> updateUser(Integer id, User tempUser){
		Optional<User> user = userRepository.findById(id);
		
		if(user.isPresent()) {
			User updatedUser = userRepository.save(tempUser);
			return ResponseEntity.ok().body(updatedUser);
		} else {
			throw new UserNotFoundException();
		}
	}
	
	public ResponseEntity<User> createUser(User user){
		User result = userRepository.save(user);
		return ResponseEntity.ok().body(result);
	}
	
	public ResponseEntity<?> deleteUser(Integer id){
		Optional<User> user = userRepository.findById(id);
		
		if(user.isPresent()) {
			userRepository.delete(user.get());
			return ResponseEntity.ok().body("User Deleted");
		} else {
			throw new UserNotFoundException();
		}
	}
	
//	public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file){
//		
//	}
}
