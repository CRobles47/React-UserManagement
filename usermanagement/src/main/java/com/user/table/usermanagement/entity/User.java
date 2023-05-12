package com.user.table.usermanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@NonNull
	private String firstname;
	@NonNull
	private String lastname;
	private String email;
	@Lob
	@Column(columnDefinition = "BLOB")
	private String image;
	
	public User(String firstname, String lastname, String email, String image){
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.image = image;
	}
}