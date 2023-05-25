package com.exam.examserver.repo;

import com.exam.examserver.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, String> {
    boolean existsByOrgName(String orgName);
}
