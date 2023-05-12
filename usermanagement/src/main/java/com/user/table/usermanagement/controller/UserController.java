package com.user.table.usermanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.table.usermanagement.entity.User;
import com.user.table.usermanagement.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService uService;
	
	@PostMapping("/create")
	public ResponseEntity<User> createUser(@Validated @RequestBody User user){
		return this.uService.createUser(user);
	}
	
	@GetMapping("/getall")
	public ResponseEntity<?> getAll(){
		return ResponseEntity.ok().body(this.uService.getAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUser(@PathVariable Integer id){
		return this.uService.getUser(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Integer id, @Validated @RequestBody User user){
		return this.uService.updateUser(id, user);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer id){
		return this.uService.deleteUser(id);
	}
}
